import { S3Client } from "@aws-sdk/client-s3";

export const awsS3Client = new S3Client({}); // credentials are loaded from environment variables
