import { env } from "@/env";
import { awsS3Client } from "@/lib/constants/aws-s3";
import { getFoldername } from "@/lib/server-actions/helper-actions";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
	CONSOLE_RED_TEXT,
	STATUS_BAD_REQUEST,
	STATUS_INTERNAL_SERVER_ERROR,
	STATUS_OK,
	ZIP_FILE_EXTENSION,
} from "@/lib/constants/app";

export async function POST(request: Request) {
	const formData = await request.formData();
	const file = formData.get("file") as File | null;

	if (!file) return new Response(null, { status: STATUS_BAD_REQUEST, statusText: "No file provided" });

	// s3 only accepts file in the form of a buffer
	const fileArrayBuffer = await file.arrayBuffer();
	const fileUint8Array = new Uint8Array(fileArrayBuffer);

	try {
		const filename = file.name + ZIP_FILE_EXTENSION; // default
		const foldername = await getFoldername();

		if (foldername instanceof Error) {
			return new Response(null, { status: STATUS_INTERNAL_SERVER_ERROR, statusText: foldername.message });
		}

		const putCommand = new PutObjectCommand({
			Bucket: env.AWS_BUCKET_NAME,
			Key: foldername + filename,
			Body: fileUint8Array,
			ContentType: file.type,
		});

		const getCommand = new GetObjectCommand({
			Bucket: env.AWS_BUCKET_NAME,
			Key: foldername + filename,
		});

		await awsS3Client.send(putCommand);
		const fileUrl = await getSignedUrl(awsS3Client, getCommand);
		return new Response(JSON.stringify({ filename, fileUrl }), { status: STATUS_OK });
	} catch (error) {
		console.error(CONSOLE_RED_TEXT, `UPLOAD FILE FAULT => ${error as string}`);
		return new Response(null, { status: STATUS_INTERNAL_SERVER_ERROR, statusText: "Something went wrong" });
	}
}
