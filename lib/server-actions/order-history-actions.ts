"use server";
import { mongoClient, usersCollection } from "@/lib/constants/mongo";
import type { OrderType } from "@/types/order-types";
import { auth } from "@clerk/nextjs";

export async function fetchUserOrdersAction(): Promise<OrderType[]> {
	try {
		const { userId } = auth();
		await mongoClient.connect();
		const filter = { userId };
		const options = { projection: { _id: 0, orders: 1 } };
		const result = await usersCollection.findOne<{ orders: OrderType[] }>(filter, options);
		if (!result) throw new Error("FETCH USER ORDERS FAULT");
		return result.orders;
	} catch (error) {
		throw error; // handle on the client side.
	}
}
