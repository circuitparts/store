import { env } from "@/env";
import { createClient } from "redis";

export const redis = createClient({
	url: env.REDIS_URL,
});

await redis.connect();
