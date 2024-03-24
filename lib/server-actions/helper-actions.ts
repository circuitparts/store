/* Helper functions for server actions. */
"use server";
import { env } from "@/env";
import { CONSOLE_RED_TEXT, DIR_PATH_DELIMITER } from "@/lib/constants/app";
import { awsS3Client } from "@/lib/constants/aws-s3";
import { guestCartsCollection, mongoClient, openOrdersCollection, usersCollection } from "@/lib/constants/mongo";
import { ORDER_NOTIFICATION_EMAIL_ENDPOINT } from "@/lib/constants/page-routes";
import {
	calculateCartSubtotal,
	calculateSalesTax,
	getAllPcbs,
	getShippingCost,
	handleApiRequestError,
	setExchangeRateForCurrency,
} from "@/lib/utils";
import type { ParsedBomDataObjectType } from "@/types/bom-parser-types";
import type { CartDataType, CartItemType, CartItemsType } from "@/types/cart-types";
import type { CheckoutDataPropsType } from "@/types/checkout-types";
import type { CurrencyType } from "@/types/currency-types";
import type { OpenOrderType, OrderType } from "@/types/order-types";
import type { SavedProjectType } from "@/types/saved-project-types";
import type { SignupPropsType, UserType } from "@/types/user-types";
import { CopyObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { auth } from "@clerk/nextjs";
import { cookies } from "next/headers";
import orderId from "order-id";
import Papa, { type ParseResult } from "papaparse";
import ShortUniqueId from "short-unique-id";

export async function createNewUser(props: SignupPropsType): Promise<UserType> {
	const { email, firstName, lastName, userId } = props;
	return {
		createdAt: new Date(),
		userId,
		email,
		firstName,
		lastName,
		billingAddresses: [],
		shippingAddresses: [],
		cart: {
			cartSize: 0,
			cartItems: [],
		},
		s3FileDir: null,
		orders: [],
		savedProjects: [],
	};
}

export async function mergeUserAndGuestCarts(userCart: CartDataType, guestCart: CartDataType): Promise<CartDataType> {
	guestCart.cartItems.forEach(guestCartItem => {
		const existingItem = userCart.cartItems.find(
			userCartItem => userCartItem.Type === guestCartItem.Type && userCartItem.Name === guestCartItem.Name
		);
		if (existingItem) {
			existingItem.OrderedQty = guestCartItem.OrderedQty; // update qty
		} else {
			userCart.cartItems.push(guestCartItem);
			userCart.cartSize++;
		}
		userCart.updatedAt = guestCart.updatedAt;
	});
	return userCart;
}

/*
 * If there are PCBs in the guest cart, then design files need to be transferred to the user's s3 directory after login.
 * Get user's S3 directory name from the database and copy files from guest S3 directory to user's S3 directory and delete guest S3 directory.
 * If user's S3 directory name is null (new signup or first time user), copy guest S3 directory name to user's S3 directory name.
 */
export async function relocatePcbDesignFilesInS3Bucket(guestCart: CartDataType): Promise<null | Error> {
	const guestCartPcbs = getAllPcbs(guestCart);
	if (!guestCartPcbs.length) return null;

	// files need to be transferred to the user's s3 directory
	try {
		const cartIdCookie = cookies().get("cartId");
		if (!cartIdCookie) throw new Error("CART ID COOKIE MISSING");
		const guestS3DirName = cartIdCookie.value;
		const { userId } = auth();

		await mongoClient.connect();
		const filter = { userId };
		const filterOptions = { projection: { _id: 0, s3FileDir: 1 } };
		const s3DirResults = await usersCollection.findOne<{ s3FileDir: string | null }>(filter, filterOptions);
		if (!s3DirResults) throw new Error("S3 FILE DIRECTORY PROPERTY MISSING");

		if (s3DirResults.s3FileDir) {
			// copy files from guest s3 directory to user's s3 directory
			const userS3DirName = s3DirResults.s3FileDir;
			await copyFilesFromSourceToDestination(guestS3DirName, userS3DirName);
			await deleteFilesInSourceDirectory(guestS3DirName);
		} else {
			// user's s3 directory name is null (new user), copy guest s3 directory name to user's s3 directory name
			await usersCollection.updateOne(filter, { $set: { s3FileDir: guestS3DirName } });
		}
		return null;
	} catch (error) {
		return handleApiRequestError(error, "RELOCATE PCB DESIGN FILES FAULT");
	}
}

async function copyFilesFromSourceToDestination(sourceDir: string, destinationDir: string): Promise<null | Error> {
	try {
		// list all objects in the source directory
		const listCommand = new ListObjectsV2Command({
			Bucket: env.AWS_BUCKET_NAME,
			Prefix: sourceDir + "/",
		});
		const listResults = await awsS3Client.send(listCommand);
		const sourceObjects = listResults.Contents;
		if (!sourceObjects) throw new Error("NO OBJECTS FOUND IN SOURCE DIRECTORY");

		// copy each object to the destination directory
		for (const sourceObject of sourceObjects) {
			const destinationKey = sourceObject.Key?.replace(sourceDir + "/", "");
			const copyCommand = new CopyObjectCommand({
				CopySource: env.AWS_BUCKET_NAME + "/" + sourceObject.Key,
				Bucket: env.AWS_BUCKET_NAME,
				Key: destinationDir + "/" + destinationKey,
			});
			await awsS3Client.send(copyCommand);
		}
		return null;
	} catch (error) {
		return handleApiRequestError(error, "COPY FILES FROM SOURCE TO DESTINATION FAULT");
	}
}

export async function deleteFilesInSourceDirectory(foldername: string): Promise<null | Error> {
	try {
		// list all objects in the source directory
		const listCommand = new ListObjectsV2Command({
			Bucket: env.AWS_BUCKET_NAME,
			Prefix: foldername + "/",
		});
		const listResults = await awsS3Client.send(listCommand);
		const sourceObjects = listResults.Contents;
		if (!sourceObjects) throw new Error("NO OBJECTS FOUND IN SOURCE DIRECTORY");

		// delete each object in the source directory
		for (const sourceObject of sourceObjects) {
			const deleteCommand = new DeleteObjectCommand({
				Bucket: env.AWS_BUCKET_NAME,
				Key: sourceObject.Key,
			});
			await awsS3Client.send(deleteCommand);
		}
		return null;
	} catch (error) {
		return handleApiRequestError(error, "DELETE FILES IN SOURCE DIRECTORY FAULT");
	}
}

export async function updateCartInDB(cart: CartDataType): Promise<null | Error> {
	try {
		await mongoClient.connect();
		const { userId } = auth();
		const cartIdCookie = cookies().get("cartId");
		const collection = userId ? usersCollection : guestCartsCollection;
		const filter = userId ? { userId } : { cartId: cartIdCookie?.value };
		await collection.updateOne(filter, { $set: { cart } });
		return null;
	} catch (error) {
		return handleApiRequestError(error, "UPDATE CART IN DB FAULT");
	}
}

export async function fetchGuestCart(): Promise<CartDataType | null | Error> {
	try {
		await mongoClient.connect();
		const options = { projection: { _id: 0, cart: 1 } };
		const cartIdCookie = cookies().get("cartId");
		const cartId = cartIdCookie?.value;
		const guestCartFilter = { cartId };
		const guestResults = await guestCartsCollection.findOne<{ cart: CartDataType }>(guestCartFilter, options);
		return guestResults ? guestResults.cart : null;
	} catch (error) {
		return handleApiRequestError(error, "FETCH GUEST CART FAULT");
	}
}

export async function cleanupGuestCart(): Promise<null | Error> {
	try {
		await mongoClient.connect();
		const cartIdCookie = cookies().get("cartId");
		const cartId = cartIdCookie?.value;
		const guestCartFilter = { cartId };
		await guestCartsCollection.deleteOne(guestCartFilter);
		cookies().set("cartId", "", { maxAge: 0 }); // delete cookie
		return null;
	} catch (error) {
		return handleApiRequestError(error, "CLEANUP GUEST CART FAULT");
	}
}

export async function fetchUserCart(): Promise<CartDataType | null | Error> {
	try {
		await mongoClient.connect();
		const options = { projection: { _id: 0, cart: 1 } };
		const { userId } = auth();
		const userFilter = { userId };
		const userResults = await usersCollection.findOne<{ cart: CartDataType }>(userFilter, options);
		return userResults ? userResults.cart : null;
	} catch (error) {
		return handleApiRequestError(error, "FETCH USER CART FAULT");
	}
}

export async function insertOrUpdateCartItem(currentCart: CartDataType, item: CartItemType): Promise<void> {
	const existingItem = currentCart.cartItems.find(
		cartItem => cartItem.Type === item.Type && cartItem.Name === item.Name
	);
	if (existingItem) {
		existingItem.OrderedQty += item.OrderedQty;
		currentCart.updatedAt = new Date();
	} else {
		currentCart.updatedAt = new Date();
		currentCart.cartItems.push(item);
		currentCart.cartSize++;
	}
	return;
}

export async function createGuestCartWithItem(props: CartItemType): Promise<CartDataType> {
	return {
		createdAt: new Date(),
		updatedAt: new Date(),
		cartSize: 1,
		cartItems: [props],
	};
}

export async function createNewCartInDB(cart: CartDataType): Promise<null | Error> {
	try {
		await mongoClient.connect();
		const cartIdCookie = cookies().get("cartId");
		const cartId = cartIdCookie ? cartIdCookie.value : new ShortUniqueId({ length: 8 }).randomUUID();
		await createCartCookie(cartId); // future reference
		await guestCartsCollection.insertOne({
			cartId,
			cart,
		});
		return null;
	} catch (error) {
		return handleApiRequestError(error, "CREATE NEW CART IN DB FAULT");
	}
}

export async function createCartCookie(cartId: string): Promise<void> {
	cookies().set({
		name: "cartId",
		value: cartId,
		path: "/",
		maxAge: 60 * 60 * 24 * 30, // one month
		sameSite: true,
		secure: true,
	});
	return;
}

export async function filterCartItemsByName(cart: CartDataType, itemName: string): Promise<CartItemsType> {
	return cart.cartItems.filter(cartItem => cartItem.Name !== itemName);
}

export async function filterCartItemsByType(cart: CartDataType, itemType: "Part" | "PCB"): Promise<CartItemsType> {
	return cart.cartItems.filter(cartItem => cartItem.Type !== itemType);
}

// for order history
export async function createNewOrder(props: { paymentId: string; currency: CurrencyType }): Promise<OrderType | Error> {
	const { paymentId, currency } = props;
	const { userId } = auth();
	const filter = { userId };
	try {
		await mongoClient.connect();
		const options = { projection: { _id: 0, cart: 1, billingAddresses: 1, shippingAddresses: 1 } };
		const result = await usersCollection.findOne<CheckoutDataPropsType>(filter, options);
		if (!result) throw new Error("USER NOT FOUND");

		const cart = result.cart;
		const cartSubtotal = calculateCartSubtotal(cart);
		const billingAddress = result.billingAddresses[0];
		const shippingAddress = result.shippingAddresses[0];
		const shippingCountry = shippingAddress.country;
		const { partShippingCost, pcbShippingCost } = getShippingCost(shippingCountry, cart);
		const totalShippingCost = partShippingCost + pcbShippingCost;
		const tax = calculateSalesTax(cartSubtotal + totalShippingCost);
		const totalOrderValue = cartSubtotal + totalShippingCost + tax;

		const newOrderId = orderId(paymentId).generate();

		const newOrder: OrderType = {
			id: newOrderId,
			createdAt: new Date(),
			status: "Placed",
			cartValue: cartSubtotal,
			discountCode: "NA",
			discountValue: 0,
			tax,
			shippingCost: 0,
			cartTotal: totalOrderValue,
			paymentId,
			shipper: null,
			awb: null,
			billingAddress,
			shippingAddress,
			cart,
			remarks: null,
			currency,
			exchangeRate: setExchangeRateForCurrency(currency),
		};

		// send order confirmation email to customer
		await fetch(ORDER_NOTIFICATION_EMAIL_ENDPOINT, {
			method: "POST",
			body: JSON.stringify(newOrder),
		});

		await usersCollection.updateOne(filter, { $push: { orders: newOrder } });
		return newOrder;
	} catch (error) {
		return handleApiRequestError(error, "CREATE NEW ORDER FAULT");
	}
}

// for admin use
export async function createNewOpenOrder(newOrder: OrderType): Promise<null | Error> {
	try {
		await mongoClient.connect();
		const { userId } = auth();
		const newOpenOrder: OpenOrderType = {
			...newOrder,
			userId,
			notes: null,
		};
		await openOrdersCollection.insertOne(newOpenOrder); // for admin
		return null;
	} catch (error) {
		return handleApiRequestError(error, "CREATE NEW OPEN ORDER FAULT");
	}
}

export async function resetCart(): Promise<null | Error> {
	try {
		const newCart: CartDataType = {
			cartSize: 0,
			cartItems: [],
		};
		await mongoClient.connect();
		const { userId } = auth();
		const filter = { userId };
		await usersCollection.updateOne(filter, { $set: { cart: newCart } });
		return null;
	} catch (error) {
		return handleApiRequestError(error, "RESET CART FAULT");
	}
}

/*
 * If no userId or cartId cookie is found, new guest cart is created and its cartId is used as the foldername.
 * if cartId cookie is found, then its value is the associated foldername in the s3 bucket.
 * if userId is found:
 *   - if user just signed up, foldername in db will be null. In that case, new foldername is created (cartId) and associated with the user.
 *   - if user already has a foldername (from past use), then that foldername is used.
 */
export async function getFoldername(): Promise<string | Error> {
	let foldername = DIR_PATH_DELIMITER; // init => start with file separator.

	const { userId } = auth();
	const cartIdCookie = cookies().get("cartId");
	const newCartId = new ShortUniqueId({ length: 8 }).randomUUID();

	try {
		if (!userId && !cartIdCookie) {
			// create new guest cart and its associated foldername
			await createCartCookie(newCartId);
			await guestCartsCollection.insertOne({
				cartId: newCartId,
				cart: {
					createdAt: new Date(),
					updatedAt: new Date(),
					cartSize: 0,
					cartItems: [],
				},
			});
			foldername = newCartId + DIR_PATH_DELIMITER;
			return foldername;
		}
	} catch (error) {
		return handleApiRequestError(error, "ASSIGN NEW FOLDERNAME FAULT");
	}

	try {
		if (userId) {
			await mongoClient.connect();
			const options = { projection: { _id: 0, s3FileDir: 1 } };
			const userFilter = { userId };
			const result = await usersCollection.findOne<{ s3FileDir: string | null }>(userFilter, options);
			if (!result) throw new Error("USER NOT FOUND");

			// check if user has a foldername associated with their account
			if (result.s3FileDir) {
				foldername = result.s3FileDir + DIR_PATH_DELIMITER;
			} else {
				foldername = newCartId + DIR_PATH_DELIMITER;
				await usersCollection.updateOne(userFilter, { $set: { s3FileDir: newCartId } });
			}
			return foldername;
		}
	} catch (error) {
		return handleApiRequestError(error, "GET/SET USER FOLDERNAME FAULT");
	}

	try {
		if (cartIdCookie) {
			foldername = cartIdCookie.value + DIR_PATH_DELIMITER;
		}
		return foldername;
	} catch (error) {
		return handleApiRequestError(error, "GET GUEST FOLDERNAME FAULT");
	}
}

// bom parser
export default async function parseCsvFile(file: File): Promise<ParsedBomDataObjectType[]> {
	try {
		const fileData = await file.text();
		const config = {
			header: true,
			skipEmptyLines: true,
			delimiter: ",",
		};
		const csv: ParseResult<unknown> = Papa.parse(fileData, config);
		if (csv.errors.length > 0) {
			csv.errors.forEach(error => {
				throw new Error(`${error.message} at row ${error.row}`);
			});
		}
		return csv.data as ParsedBomDataObjectType[];
	} catch (error) {
		console.error(CONSOLE_RED_TEXT, `PARSE CSV FILE FAULT => ${error as string}`);
		throw error;
	}
}

// saved project
export async function fetchSavedProjects(): Promise<SavedProjectType[] | null | Error> {
	try {
		await mongoClient.connect();
		const options = { projection: { _id: 0, savedProjects: 1 } };
		const { userId } = auth();
		const userFilter = { userId };
		const userResults = await usersCollection.findOne<{ savedProjects: SavedProjectType[] }>(userFilter, options);
		return userResults ? userResults.savedProjects : null;
	} catch (error) {
		return handleApiRequestError(error, "FETCH SAVED PROJECTS FAULT");
	}
}
