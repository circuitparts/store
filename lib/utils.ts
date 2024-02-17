import { countriesAndStates } from "@/data/countries-and-states";
import { countryDailCodes } from "@/data/country-dail-codes";
import { env } from "@/env";
import {
	AUD_CURR_CODE,
	CONSOLE_RED_TEXT,
	CONSOLE_YELLOW_TEXT,
	CURRENCY_CODES,
	DOMESTIC_PARTS_SHIP_FEE,
	DOMESTIC_PCB_SHIP_FEE,
	EUR_CURR_CODE,
	GBP_CURR_CODE,
	GST_PERCENTAGE,
	INR_CURR_CODE,
	OVERSEAS_PARTS_SHIP_FEE,
	OVERSEAS_PCB_SHIP_FEE,
	SALES_TAX_PERCENTAGE,
	USD_AUD_EXCHANGE_RATE,
	USD_CURR_CODE,
	USD_EUR_EXCHANGE_RATE,
	USD_GBP_EXCHANGE_RATE,
	USD_INR_EXCHANGE_RATE,
} from "@/lib/constants/app";
import type { CartDataType } from "@/types/cart-types";
import type { CurrencyType } from "@/types/currency-types";
import type { PartDataType } from "@/types/part-types";
import type { PcbType } from "@/types/pcb-types";
import { clsx, type ClassValue } from "clsx";
import IPinfoWrapper, { type IPinfo } from "node-ipinfo";
import { twMerge } from "tailwind-merge";

const ipinfoWrapper = new IPinfoWrapper(env.NEXT_PUBLIC_IP_INFO_API_KEY); // your IPinfo API key

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getCurrentYear(): number {
	return new Date().getFullYear();
}

export function getInitialsFromFullName(firstName: string, lastName: string): string {
	const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
	return initials;
}

export function getFutureBusinessDate(daysToAdd: number) {
	const currentDate = new Date();
	let workingDaysAdded = 0;
	const currentDay = currentDate;

	while (workingDaysAdded < daysToAdd) {
		currentDay.setDate(currentDay.getDate() + 1); // Add one day at a time

		// Check if the current day is a business day (Monday to Friday)
		if (currentDay.getDay() >= 1 && currentDay.getDay() <= 5) {
			workingDaysAdded++;
		}
	}

	// Format the date as DD/MM/YYYY
	const futureDate = `${currentDay.getDate().toString().padStart(2, "0")}/${(currentDay.getMonth() + 1)
		.toString()
		.padStart(2, "0")}/${currentDay.getFullYear()}`;

	return futureDate;
}

export function formatAmountToINR(amount: number): string {
	const INR_CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "INR",
	});
	const formattedAmount = INR_CURRENCY_FORMATTER.format(amount);
	return formattedAmount;
}

export function formatAmountToUSD(amount: number): string {
	const USD_CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});
	const formattedAmount = USD_CURRENCY_FORMATTER.format(amount);
	return formattedAmount;
}

export function formatAmountToAUD(amount: number): string {
	const AUD_CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "AUD",
	});
	const formattedAmount = AUD_CURRENCY_FORMATTER.format(amount);
	return formattedAmount;
}

export function formatAmountToEUR(amount: number): string {
	const EUR_CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "EUR",
	});
	const formattedAmount = EUR_CURRENCY_FORMATTER.format(amount);
	return formattedAmount;
}

export function formatAmountToGBP(amount: number): string {
	const GBP_CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "GBP",
	});
	const formattedAmount = GBP_CURRENCY_FORMATTER.format(amount);
	return formattedAmount;
}

export function transformStringToTitleCase(str: string): string {
	const words = str.match(/[A-Za-z][a-z]*/g) ?? [];
	const titleCaseString = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
	return titleCaseString;
}

export function getCountries() {
	return countriesAndStates.map(country => country.name);
}

export function getCountryISO2Code(country: string) {
	const selectedCountry = countriesAndStates.find(c => c.name === country);
	return selectedCountry?.iso2;
}

export function getCountryISO3Code(country: string) {
	const selectedCountry = countriesAndStates.find(c => c.name === country);
	return selectedCountry?.iso3;
}

export function getStates(country: string) {
	const selectedCountry = countriesAndStates.find(c => c.name === country);
	return selectedCountry?.states.map(state => state.name);
}

export function getCountryDailCode(country: string) {
	const selectedCountry = countryDailCodes.find(c => c.name === country);
	return selectedCountry?.dial_code;
}

export function calculateGst(num: number): number {
	return Number((num * GST_PERCENTAGE).toFixed(2));
}

export function calculateSalesTax(num: number): number {
	return Number((num * SALES_TAX_PERCENTAGE).toFixed(2));
}

export function convertAndFormatUsdToInr(num: number): string {
	const convertedCurr = Number((num * USD_INR_EXCHANGE_RATE).toFixed(2));
	return formatAmountToINR(convertedCurr);
}

export function convertAndFormatInrToUsd(num: number): string {
	const convertedCurr = Number((num / USD_INR_EXCHANGE_RATE).toFixed(2));
	return formatAmountToUSD(convertedCurr);
}

export function convertToStripeOrderAmount(amount: number, toCurrency: CurrencyType): number {
	switch (toCurrency) {
		case INR_CURR_CODE:
			return Number((amount * USD_INR_EXCHANGE_RATE * 100).toFixed(2)); // Stripe expects price in cents
		case EUR_CURR_CODE:
			return Number((amount * USD_EUR_EXCHANGE_RATE * 100).toFixed(2)); // Stripe expects price in cents
		case GBP_CURR_CODE:
			return Number((amount * USD_GBP_EXCHANGE_RATE * 100).toFixed(2)); // Stripe expects price in cents
		case AUD_CURR_CODE:
			return Number((amount * USD_AUD_EXCHANGE_RATE * 100).toFixed(2)); // Stripe expects price in cents
		default:
			return Number((amount * 100).toFixed(2)); // default USD. Stripe expects price in cents
	}
}

export function parsePriceToNumber(price: string): number {
	return Number(price.slice(1).replace(/,/g, ""));
}

export function formatCurrency(amount: number, toCurrency: CurrencyType): string {
	switch (toCurrency) {
		case INR_CURR_CODE:
			return formatAmountToINR(amount);
		case EUR_CURR_CODE:
			return formatAmountToEUR(amount);
		case GBP_CURR_CODE:
			return formatAmountToGBP(amount);
		case AUD_CURR_CODE:
			return formatAmountToAUD(amount);
		default:
			return formatAmountToUSD(amount);
	}
}

export function convertAndFormatCurrencyForOrderHistory(
	amount: number,
	toCurrency: CurrencyType,
	exchangeRate: number
): string {
	const convertedCurr = Number((amount * exchangeRate).toFixed(2));
	return formatCurrency(convertedCurr, toCurrency);
}

export function getExchangeRate(currency: CurrencyType): number {
	switch (currency) {
		case INR_CURR_CODE:
			return USD_INR_EXCHANGE_RATE;
		case EUR_CURR_CODE:
			return USD_EUR_EXCHANGE_RATE;
		case GBP_CURR_CODE:
			return USD_GBP_EXCHANGE_RATE;
		case AUD_CURR_CODE:
			return USD_AUD_EXCHANGE_RATE;
		default:
			return 1; // USD is the base currency
	}
}

export function convertAndFormatCurrency(amount: number, toCurrency: CurrencyType): string {
	const exchangeRate = getExchangeRate(toCurrency);
	const convertedCurr = Number((amount * exchangeRate).toFixed(2));
	return formatCurrency(convertedCurr, toCurrency);
}

export function calculatePartUnitPrice(parts: PartDataType[], name: string): number {
	const part = parts.find(item => item.Name === name);
	if (!part) return 0.0;

	const sortedPricing = part.PriceBreaks.sort((a, b) => a.Quantity - b.Quantity);
	const priceSlab = sortedPricing.reduce((acc, curr) => {
		if (part.OrderedQty >= curr.Quantity) {
			return curr; // valid slab
		}
		return acc; //last slab
	}, sortedPricing[0]); // Default to the first slab if none are valid

	return parsePriceToNumber(priceSlab.Price);
}

export function calculatePartNetPrice(part: PartDataType): number {
	const unitPrice = calculatePartUnitPrice([part], part.Name);
	const netPrice = unitPrice * part.OrderedQty;
	return netPrice;
}

export function getAllParts(props: CartDataType): PartDataType[] {
	return props.cartItems.filter((item): item is PartDataType => item.Type === "Part");
}
export function getAvailableParts(props: CartDataType): PartDataType[] {
	return props.cartItems.filter((item): item is PartDataType => item.Type === "Part" && item.Status === "Available");
}

export function getBackOrderedParts(props: CartDataType): PartDataType[] {
	return props.cartItems.filter(
		(item): item is PartDataType => item.Type === "Part" && item.Status === "Back Ordered"
	);
}

export function getAllPcbs(props: CartDataType): PcbType[] {
	return props.cartItems.filter((item): item is PcbType => item.Type === "PCB");
}

export function getRigidPcbs(props: CartDataType): PcbType[] {
	return props.cartItems.filter((item): item is PcbType => item.Type === "PCB" && item.Category === "Rigid PCB");
}

export function getFlexPcbs(props: CartDataType): PcbType[] {
	return props.cartItems.filter((item): item is PcbType => item.Type === "PCB" && item.Category === "Flex PCB");
}

export function getPcbAssemblies(props: CartDataType): PcbType[] {
	return props.cartItems.filter((item): item is PcbType => item.Type === "PCB" && item.Category === "PCB Assembly");
}

export function calculateTotalPartsCost(cart: CartDataType | null): number {
	if (!cart) return 0;
	const parts = getAllParts(cart);
	const total = parts.reduce((acc, curr) => {
		const netPrice = calculatePartNetPrice(curr);
		return acc + netPrice;
	}, 0);
	return total;
}

export function calculateTotalPcbsCost(cart: CartDataType | null): number {
	if (!cart) return 0;
	const pcbs = getAllPcbs(cart);
	const total = pcbs.reduce((acc, curr) => {
		const netPrice = Number(curr.NetPrice);
		return acc + netPrice;
	}, 0);
	return total;
}

export function calculateCartSubtotal(cart: CartDataType | null): number {
	const partTotal = calculateTotalPartsCost(cart);
	const pcbTotal = calculateTotalPcbsCost(cart);
	const cartTotal = partTotal + pcbTotal;
	return cartTotal;
}

export function calculateBytesFromMb(mb: number): number {
	return mb * 1024 * 1024;
}

export function generateS3Url(props: { s3Bucket: string; region: string; fileName: string }): string {
	const { s3Bucket, region, fileName } = props;
	return `https://${s3Bucket}.s3${region}.amazonaws.com/${fileName}`;
}

export function getShippingCost(
	shippingCountry: string,
	cart: CartDataType | null
): {
	partShippingCost: number;
	pcbShippingCost: number;
} {
	if (!cart) return { partShippingCost: 0, pcbShippingCost: 0 };
	let partShippingPrice = 0;
	let pcbShippingPrice = 0;

	switch (shippingCountry) {
		case "United States":
			partShippingPrice = DOMESTIC_PARTS_SHIP_FEE;
			pcbShippingPrice = OVERSEAS_PCB_SHIP_FEE;
			break;

		case "India":
			partShippingPrice = OVERSEAS_PARTS_SHIP_FEE;
			pcbShippingPrice = DOMESTIC_PCB_SHIP_FEE;
			break;

		default:
			partShippingPrice = OVERSEAS_PARTS_SHIP_FEE;
			pcbShippingPrice = OVERSEAS_PCB_SHIP_FEE;
			break;
	}

	// If there are parts/pcbs in the cart, add the parts/pcbs shipping cost
	const partShippingCost = cart.cartItems.some(item => item.Type === "Part") ? partShippingPrice : 0;
	const pcbShippingCost = cart.cartItems.some(item => item.Type === "PCB") ? pcbShippingPrice : 0;

	return { partShippingCost, pcbShippingCost };
}

export async function apiRequestRateLimiter(requestCount: number, requestsPerMinute: number): Promise<void> {
	const timeInterval = (60 * 1000) / requestsPerMinute; // one request every 2000ms or 1 request every 2 seconds.

	return new Promise(resolve => {
		if (requestCount >= requestsPerMinute) {
			console.warn(CONSOLE_YELLOW_TEXT, "RATE LIMITER ENABLED...SLOWING DOWN REQUESTS...");
			const timeSpent = Date.now() % timeInterval;
			const remainderTime = timeInterval - timeSpent;
			setTimeout(() => {
				console.warn(CONSOLE_YELLOW_TEXT, "DISABLING RATE LIMITER...");
				resolve();
			}, remainderTime); // wait for remainder time to pass before making another request.
		} else {
			resolve();
		}
	});
}

// the default base currency is USD. This needs to be converted to the selected currency.
export function setExchangeRateForCurrency(currency: CurrencyType): number {
	switch (currency) {
		case INR_CURR_CODE:
			return USD_INR_EXCHANGE_RATE;
		case EUR_CURR_CODE:
			return USD_EUR_EXCHANGE_RATE;
		case GBP_CURR_CODE:
			return USD_GBP_EXCHANGE_RATE;
		case AUD_CURR_CODE:
			return USD_AUD_EXCHANGE_RATE;
		default:
			return 1; // USD is the base currency
	}
}

export function handleApiRequestError(error: unknown, title: string): Error {
	const unknownError = "Something went wrong, please try again later.";
	const errorMessage = error instanceof Error ? error.message : unknownError;
	console.error(CONSOLE_RED_TEXT, `${title} => ${errorMessage}`);
	return new Error(errorMessage);
}

export async function getCurrencyByIPAddr(): Promise<CurrencyType | null> {
	try {
		const response: IPinfo = await ipinfoWrapper.lookupIp(""); // empty string will return the IP of the user
		const countryCurrency = response.countryCurrency.code.toLowerCase();
		const defaultCurrency = CURRENCY_CODES.includes(countryCurrency) ? countryCurrency : USD_CURR_CODE; // USD by Default
		return defaultCurrency as CurrencyType;
	} catch (error) {
		console.error(error);
		return null;
	}
}
