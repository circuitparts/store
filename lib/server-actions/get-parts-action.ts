"use server";
import { CONSOLE_GREEN_TEXT, MAX_PART_REQUESTS_PER_MIN, PARTS_API_ENDPOINT } from "@/lib/constants/app";
import { redis } from "@/lib/constants/redis";
import { apiRequestRateLimiter } from "@/lib/utils";
import type { PartResultsType } from "@/types/part-types";

let requestCount = 0;

export async function getPartsAction(partName: string) {
	try {
		const cachedData = await redis.get(partName);
		// check cache first
		if (cachedData) {
			console.log(CONSOLE_GREEN_TEXT, "GETTING DATA FROM CACHE");
			try {
				return typeof cachedData === 'string' 
					? JSON.parse(cachedData) as PartResultsType
					: cachedData as PartResultsType;
			} catch (error) {
				console.error('Error parsing cached data:', error);
				return null;
			}
		}
		// no cached data available
		console.log(CONSOLE_GREEN_TEXT, "FETCHING DATA FROM API");

		// rate limits for BOM parser
		await apiRequestRateLimiter(requestCount, MAX_PART_REQUESTS_PER_MIN); // 1 request every 2 seconds.
		requestCount = (requestCount + 1) % MAX_PART_REQUESTS_PER_MIN; // reset request count after 30 requests

		const response = await fetch(PARTS_API_ENDPOINT + partName);
		if (!response.ok) throw response.statusText;

		const partsData = (await response.json()) as PartResultsType;

		// cache data
		await redis.set(partName, JSON.stringify(partsData));
		await redis.expire(partName, 60 * 60 * 24); // 1 day

		return partsData;
	} catch (error) {
		throw error; // handle on the client side
	}
}
