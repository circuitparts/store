"use server";
import { env } from "@/env";
import { DIR_PATH_DELIMITER, ZIP_FILE_EXTENSION } from "@/lib/constants/app";
import { awsS3Client } from "@/lib/constants/aws-s3";
import { mongoClient, usersCollection } from "@/lib/constants/mongo";
import { deleteFilesInSourceDirectory } from "@/lib/server-actions/helper-actions";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { auth } from "@clerk/nextjs";
import { cookies } from "next/headers";

export async function deleteDesignFileFromS3(itemName: string): Promise<void> {
	try {
		let foldername = null;

		const { userId } = auth();
		const cartIdCookie = cookies().get("cartId");

		if (userId) {
			await mongoClient.connect();
			const options = { projection: { _id: 0, s3FileDir: 1 } };
			const userFilter = { userId };
			const result = await usersCollection.findOne<{ s3FileDir: string | null }>(userFilter, options);
			if (!result) throw new Error("User not found");
			foldername = result.s3FileDir ? result.s3FileDir + DIR_PATH_DELIMITER : null;
		}

		if (cartIdCookie) {
			foldername = cartIdCookie.value + DIR_PATH_DELIMITER;
		}
		const filename = foldername + itemName + ZIP_FILE_EXTENSION;
		const deleteCommand = new DeleteObjectCommand({
			Bucket: env.AWS_BUCKET_NAME,
			Key: filename,
		});
		await awsS3Client.send(deleteCommand);
		return;
	} catch (error) {
		throw error; // handled on the client side.
	}
}

export async function deleteAllDesignFilesFromS3(): Promise<void> {
	try {
		let foldername = null;

		const { userId } = auth();
		const cartIdCookie = cookies().get("cartId");

		if (userId) {
			await mongoClient.connect();
			const options = { projection: { _id: 0, s3FileDir: 1 } };
			const userFilter = { userId };
			const result = await usersCollection.findOne<{ s3FileDir: string | null }>(userFilter, options);
			if (!result) throw new Error("User not found");
			foldername = result.s3FileDir ? result.s3FileDir : undefined;
		}

		if (cartIdCookie) {
			foldername = cartIdCookie.value;
		}
		if (!foldername) return; // no files to delete
		await deleteFilesInSourceDirectory(foldername);
	} catch (error) {
		throw error; // handled on the client side.
	}
}
