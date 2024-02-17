"use server";
import { mongoClient, usersCollection } from "@/lib/constants/mongo";
import { ADDRESSES_PAGE, ORDER_SUCCESS_PAGE } from "@/lib/constants/page-routes";
import { createNewOpenOrder, createNewOrder, resetCart } from "@/lib/server-actions/helper-actions";
import type { FetchAddressesPropsType, NewAddressPropsType } from "@/types/address-types";
import type { CurrencyType } from "@/types/currency-types";
import { auth } from "@clerk/nextjs";

import { revalidatePath } from "next/cache";

export async function addAddressesAction(props: NewAddressPropsType): Promise<void> {
	const { billingAddress, shippingAddress } = props;
	try {
		const { userId } = auth();
		await mongoClient.connect();
		const userFilter = { userId };
		const updateDoc = {
			$push: {
				billingAddresses: {
					$each: [billingAddress],
					$position: 0, // add to the top of the array
					$slice: 2, // keep the first 2 addresses
				},
				shippingAddresses: {
					$each: [shippingAddress],
					$position: 0, // add to the top of the array
					$slice: 2, // keep the first 2 addresses
				},
			},
		};
		await usersCollection.updateOne(userFilter, updateDoc);
		revalidatePath(ADDRESSES_PAGE);
		return;
	} catch (error) {
		throw error; // handle on the client side.
	}
}

export async function fetchAddressesAction(): Promise<FetchAddressesPropsType | null> {
	try {
		const { userId } = auth();
		await mongoClient.connect();
		const userFilter = { userId };
		const options = { projection: { _id: 0, billingAddresses: 1, shippingAddresses: 1 } };
		const result = await usersCollection.findOne<FetchAddressesPropsType>(userFilter, options);
		return result ? result : null;
	} catch (error) {
		throw error; // handle on the client side.
	}
}

export async function captureOrderDetailsAction(props: { paymentId: string; currency: CurrencyType }): Promise<void> {
	try {
		const newOrder = await createNewOrder(props);
		if (newOrder instanceof Error) throw newOrder;
		const newOpenOrder = await createNewOpenOrder(newOrder);
		if (newOpenOrder instanceof Error) throw newOpenOrder;
		const cartReset = await resetCart();
		if (cartReset instanceof Error) throw cartReset;
		revalidatePath(ORDER_SUCCESS_PAGE, "layout");
		return;
	} catch (error) {
		throw error; // handled on the client side.
	}
}
