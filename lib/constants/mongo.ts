import { env } from "@/env";
import { DB_COLLECTIONS, DB_NAME } from "@/lib/constants/app";
import { MongoClient } from "mongodb";

export const mongoClient = new MongoClient(env.MONGODB_URL);
export const database = mongoClient.db(DB_NAME);
export const usersCollection = database.collection(DB_COLLECTIONS.usersCollection);
export const guestCartsCollection = database.collection(DB_COLLECTIONS.guestCartsCollection);
export const openOrdersCollection = database.collection(DB_COLLECTIONS.openOrdersCollection);
export const closedOrdersCollection = database.collection(DB_COLLECTIONS.closedOrdersCollection);
