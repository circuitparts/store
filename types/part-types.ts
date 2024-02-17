export type PartResultsType = {
	Parts: Record<string, PartDataType>;
	Errors: ErrorsType | null;
};

export type PartDataType = {
	Type: "Part";
	Availability: string;
	DatasheetUrl: string;
	Description: string;
	ImagePath: string;
	Category: string;
	Manufacturer: string;
	Name: string;
	Min: string;
	Mult: string;
	BCDPercent: number;
	PriceBreaks: PriceBreakType[];
	ROHSStatus: string;
	HSCode: string;
	OrderedQty: number;
	Status: PartStatusType;
};

export type PartStatusType =
	| "Available"
	| "Back Ordered"
	| "Not Available"
	| "Dispatched"
	| "In Review"
	| "Cancelled"
	| "Ordered";

type ErrorsType = {
	Status: number;
	Text: string;
};

export type PriceBreakType = {
	Quantity: number;
	Price: string;
	Currency: string;
};

export type SortedResultsType = {
	backOrderedParts: PartDataType[];
	availableParts: PartDataType[];
};
