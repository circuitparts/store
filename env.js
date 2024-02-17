import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		NODE_ENV: z.enum(["development", "test", "production"]),
		CLERK_SECRET_KEY: z.string().min(1),
		MONGODB_URL: z.string().url(),
		AWS_ACCESS_KEY_ID: z.string().min(1),
		AWS_SECRET_ACCESS_KEY: z.string().min(1),
		AWS_REGION: z.string().min(1),
		AWS_BUCKET_NAME: z.string().min(1),
		REDIS_URL: z.string().url(),
		RESEND_API_KEY: z.string().min(1),
		STRIPE_SECRET_KEY: z.string().min(1),
	},
	client: {
		NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
		NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string().min(1),
		NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string().min(1),
		NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
		NEXT_PUBLIC_IP_INFO_API_KEY: z.string().min(1),
		NEXT_PUBLIC_DB_NAME: z.string().min(1),
		NEXT_PUBLIC_LIVE_APP_URL: z.string().min(1),
		NEXT_PUBLIC_DEV_APP_URL: z.string().min(1),
		NEXT_PUBLIC_UPDATES_EMAIL_ADDR: z.string().min(1),
	},
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,

		// mongodb
		MONGODB_URL: process.env.MONGODB_URL,

		// aws-s3
		AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
		AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
		AWS_REGION: process.env.AWS_REGION,
		AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,

		// redis
		REDIS_URL: process.env.REDIS_URL,

		// email
		RESEND_API_KEY: process.env.RESEND_API_KEY,

		// payment gateway
		STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
		NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,

		// auth
		CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
		NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
		NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
		NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,

		// ip info
		NEXT_PUBLIC_IP_INFO_API_KEY: process.env.NEXT_PUBLIC_IP_INFO_API_KEY,

		// db
		NEXT_PUBLIC_DB_NAME: process.env.NEXT_PUBLIC_DB_NAME,

		// app url
		NEXT_PUBLIC_LIVE_APP_URL: process.env.NEXT_PUBLIC_LIVE_APP_URL,
		NEXT_PUBLIC_DEV_APP_URL: process.env.NEXT_PUBLIC_DEV_APP_URL,

		// updates email
		NEXT_PUBLIC_UPDATES_EMAIL_ADDR: process.env.NEXT_PUBLIC_UPDATES_EMAIL_ADDR,
	},
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
	emptyStringAsUndefined: true,
});
