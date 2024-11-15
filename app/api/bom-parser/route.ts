import parseCsvFile from "@/lib/server-actions/helper-actions";
import { getPartsAction } from "@/lib/server-actions/get-parts-action";
import {
	CONSOLE_RED_TEXT,
	PART_OUT_OF_STOCK_STATUSES,
	STATUS_BAD_REQUEST,
	STATUS_INTERNAL_SERVER_ERROR,
	STATUS_OK,
} from "@/lib/constants/app";
import type { PartResultsType, SortedResultsType } from "@/types/part-types";

export async function POST(request: Request) {
	const formData = await request.formData();
	const file = formData.get("file") as File | null;
	if (!file) return new Response(null, { status: STATUS_BAD_REQUEST, statusText: "No file provided" });
	try {
		const parsedData = await parseCsvFile(file);
		const promises = parsedData.map(part => {
			return getPartsAction(part.ManufacturerPartNumber);
		});
		const responses = await Promise.all(promises);

		// Api returns multiple results that match the query.
		// Filter out Names that are not exact match to Names in our bom file.
		const parsedDataNames = new Set(parsedData.map(data => data.ManufacturerPartNumber.toUpperCase())); // Get all Names from parsed data

		// Create a map to store unique parts
		const uniqueParts: Record<string, PartResultsType> = {};
		const sortedResults: SortedResultsType = {
			backOrderedParts: [],
			availableParts: [],
		};

		responses.forEach(response => {
			if(response !== null){
				for (const [key, value] of Object.entries(response.Parts)) {
					if (parsedDataNames.has(key.toUpperCase())) {
						// Only add the part to the map if it's not already present

						// Find the corresponding part in parsedData
						const correspondingPart = parsedData.find(
							part => part.ManufacturerPartNumber.toUpperCase() === key.toUpperCase()
						);

						// Update the OrderedQty value
						value.OrderedQty = correspondingPart ? parseInt(correspondingPart.Quantity) : 0;

						uniqueParts[key] = {
							Parts: { [key]: value },
							Errors: null,
						};
					}
				}
			}
		});
		// Convert the map to an array
		const filteredResults = Object.values(uniqueParts);

		// Check the Availability property of each part in the filtered data
		Object.values(filteredResults).forEach(result => {
			Object.values(result.Parts).forEach(part => {
				if (PART_OUT_OF_STOCK_STATUSES.some(status => part.Availability.includes(status))) {
					sortedResults.backOrderedParts.push(part);
				} else {
					sortedResults.availableParts.push(part);
				}
			});
		});

		return new Response(JSON.stringify(sortedResults), { status: STATUS_OK });
	} catch (error) {
		console.error(CONSOLE_RED_TEXT, `BOM PARSER FAULT => ${error as string}`);
		return new Response(null, { status: STATUS_INTERNAL_SERVER_ERROR, statusText: "Failed to process BoM" });
	}
}
