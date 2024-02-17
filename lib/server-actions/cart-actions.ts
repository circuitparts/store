"use server";
import { usersCollection } from "@/lib/constants/mongo";
import { HOME_PAGE, PRODUCTS_PAGE, SHOPPING_CART_PAGE } from "@/lib/constants/page-routes";
import {
	cleanupGuestCart,
	createGuestCartWithItem,
	createNewCartInDB,
	createNewUser,
	fetchGuestCart,
	fetchUserCart,
	filterCartItemsByName,
	filterCartItemsByType,
	insertOrUpdateCartItem,
	mergeUserAndGuestCarts,
	relocatePcbDesignFilesInS3Bucket,
	updateCartInDB,
} from "@/lib/server-actions/helper-actions";
import type { UpdatePartQtyPropsType, CartDataType, CartItemType } from "@/types/cart-types";
import type { PartDataType } from "@/types/part-types";
import type { SignupPropsType } from "@/types/user-types";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// Do not move this action to another file. You might get an error. Refer the link below for more details.
// https://github.com/vercel/next.js/discussions/59105#discussioncomment-8437333
export async function captureUserSignupAction(props: SignupPropsType): Promise<void> {
	try {
		const user = await createNewUser(props);
		const guestCart = await fetchGuestCart();

		if (guestCart instanceof Error) {
			throw guestCart;
		}

		// transfer guest cart to user cart
		const cartId = cookies().get("cartId")?.value;
		if (guestCart && cartId) {
			user.cart = guestCart;
			user.s3FileDir = cartId;

			// cleanup!
			const cleanup = await cleanupGuestCart();
			if (cleanup instanceof Error) {
				throw cleanup;
			}
		}
		await usersCollection.insertOne(user);
		revalidatePath(HOME_PAGE, "layout"); // full revalidate
	} catch (error) {
		throw error; // handled on the client side.
	}
}

export async function transferGuestCartToUserAction(): Promise<void> {
	try {
		const guestCart = await fetchGuestCart();
		const userCart = await fetchUserCart();
		if (guestCart instanceof Error) throw guestCart;
		if (userCart instanceof Error) throw userCart;

		if (userCart && guestCart) {
			const mergedCart = await mergeUserAndGuestCarts(userCart, guestCart);
			await relocatePcbDesignFilesInS3Bucket(guestCart);

			const { userId } = auth();
			const userFilter = { userId };
			await usersCollection.updateOne(userFilter, { $set: { cart: mergedCart } });

			const cleanup = await cleanupGuestCart();
			if (cleanup instanceof Error) throw cleanup;
			return;
		}
	} catch (error) {
		throw error; // handled on the client side.
	}
}

export async function deleteAllItemsAction(itemType: "Part" | "PCB"): Promise<void> {
	try {
		const cart = await fetchCartItemsAction();
		if (!cart) return;

		const updatedCartItems = await filterCartItemsByType(cart, itemType);
		cart.cartItems = updatedCartItems;
		cart.cartSize = updatedCartItems.length;
		await updateCartInDB(cart);
		revalidatePath(SHOPPING_CART_PAGE);
		return;
	} catch (error) {
		throw error; // handle on the client side.
	}
}

export async function deleteCartItemAction(name: string): Promise<void> {
	try {
		const cart = await fetchCartItemsAction();
		if (!cart) return;

		const updatedCartItems = await filterCartItemsByName(cart, name);
		cart.cartItems = updatedCartItems;
		cart.cartSize = updatedCartItems.length;
		cart.updatedAt = new Date();
		await updateCartInDB(cart);
		revalidatePath(SHOPPING_CART_PAGE);
		return;
	} catch (error) {
		throw error; // handled on the client side.
	}
}

export async function updatePartQtyAction(props: UpdatePartQtyPropsType): Promise<void> {
	try {
		const cart = await fetchCartItemsAction();
		if (!cart) return;
		const existingItem = cart.cartItems.find(cartItem => cartItem.Name === props.name);
		if (existingItem) {
			existingItem.OrderedQty = props.newQty;
			cart.updatedAt = new Date();
		}
		await updateCartInDB(cart);
		revalidatePath(SHOPPING_CART_PAGE);
		return;
	} catch (error) {
		throw error; // handled on the client side.
	}
}

export async function addMultiplePartsToCartAction(items: PartDataType[]): Promise<void> {
	try {
		const cart = await fetchCartItemsAction();
		if (cart) {
			for (const item of items) {
				await insertOrUpdateCartItem(cart, item);
			}
			await updateCartInDB(cart);
		} else {
			const guestCart = {
				cartSize: items.length,
				cartItems: items,
			};
			await createNewCartInDB(guestCart);
		}
		revalidatePath(SHOPPING_CART_PAGE);
		return;
	} catch (error) {
		throw error; // handle on the client side.
	}
}

export async function fetchCartItemsAction(): Promise<CartDataType | null> {
	try {
		const { userId } = auth();
		if (userId) {
			const userCart = await fetchUserCart();
			if (userCart instanceof Error) throw userCart;
			return userCart;
		} else {
			const guestCart = await fetchGuestCart();
			if (guestCart instanceof Error) throw guestCart;
			return guestCart;
		}
	} catch (error) {
		throw error; // handled on the client side.
	}
}

export async function fetchCartSizeAction(): Promise<number> {
	try {
		const cart = await fetchCartItemsAction();
		if (!cart) return 0; // no cart
		return cart.cartSize;
	} catch (error) {
		throw error; // handled on the client side.
	}
}

export async function addItemToCartAction(item: CartItemType): Promise<void> {
	try {
		const cart = await fetchCartItemsAction();
		if (cart) {
			await insertOrUpdateCartItem(cart, item);
			updateCartInDB(cart).catch(error => {
				throw error;
			});
		} else {
			const guestCart = await createGuestCartWithItem(item);
			await createNewCartInDB(guestCart);
		}
		revalidatePath(PRODUCTS_PAGE, "layout");
		return;
	} catch (error) {
		throw error; // handle on the client side.
	}
}
