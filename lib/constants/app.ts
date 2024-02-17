// Constants used across the monorepo.

import { env } from "@/env";

export const PLATFORM_NAME = "Circuit Parts";
export const PLATFORM_DESCRIPTION = "Electronic Components, PCB Fabrication & Assembly, all at one place.";
export const PLATFORM_ORIGIN_COUNTRY = "India";

// URLs
export const LIVE_APP_URL = env.NEXT_PUBLIC_LIVE_APP_URL;
export const DEV_APP_URL = env.NEXT_PUBLIC_DEV_APP_URL;
export const BASE_APP_URL = process.env.NODE_ENV === "production" ? LIVE_APP_URL : DEV_APP_URL;

// search hint urls
export const STM32MP1_RESULTS_PAGE_URL = `${BASE_APP_URL}/products/part/result/STM32MP1`;
export const NRF52832_DETAILS_PAGE_URL = `${BASE_APP_URL}/products/part/detail/NRF52832-QFAA-R7`;

// api endpoints
export const PRODUCTS_API_ENDPOINT = "https://api.circuitparts.in/api";
export const PARTS_API_ENDPOINT = `${PRODUCTS_API_ENDPOINT}/parts?mpn=`;
export const RIGID_PCB_API_ENDPOINT = `${PRODUCTS_API_ENDPOINT}/rigid-pcb`;
export const FLEX_PCB_API_END_POINT = `${PRODUCTS_API_ENDPOINT}/flex-pcb`;
export const PCB_ASSEMBLY_API_ENDPOINT = `${PRODUCTS_API_ENDPOINT}/pcb-assembly`;

// templates
export const BOM_TEMPLATE_URL = "s3://e-store-public-bucket/Circuit-Parts-BOM-Template.csv";

// Email addresses
export const UPDATES_NOTIFICATION_EMAIL = env.NEXT_PUBLIC_UPDATES_EMAIL_ADDR;

// Product constants
export const PART_OUT_OF_STOCK_STATUSES = ["On Order", "Not Stocked", "Non-Stocked", "None"];

// API status codes
export const STATUS_OK = 200;
export const STATUS_BAD_REQUEST = 400;
export const STATUS_NOT_FOUND = 404;
export const STATUS_INTERNAL_SERVER_ERROR = 500;

// API rate limits
export const MAX_PART_REQUESTS_PER_MIN = 30;

// File handlers
export const ZIP_FILE_EXTENSION = ".zip";
export const DIR_PATH_DELIMITER = "/";

// Tax rates
export const SALES_TAX_PERCENTAGE = 0.07; // 7% sales tax
export const GST_PERCENTAGE = 0.18; // 18% GST

// Currency codes
export const INR_CURR_CODE = "inr";
export const USD_CURR_CODE = "usd";
export const EUR_CURR_CODE = "eur";
export const GBP_CURR_CODE = "gbp";
export const AUD_CURR_CODE = "aud";
export const CURRENCY_CODES = [INR_CURR_CODE, USD_CURR_CODE, EUR_CURR_CODE, GBP_CURR_CODE, AUD_CURR_CODE];

// Exchange rates
export const USD_INR_EXCHANGE_RATE = 83.0; // 1 USD = 83 INR
export const USD_EUR_EXCHANGE_RATE = 0.91; // 1 USD = 0.91 EUR
export const USD_GBP_EXCHANGE_RATE = 0.78; // 1 USD = 0.78 GBP
export const USD_AUD_EXCHANGE_RATE = 1.56; // 1 USD = 1.56 AUD

// Shipping costs => Parts origin: US | PCB origin: India/China
export const DOMESTIC_PARTS_SHIP_FEE = 8; // flat $8 ups ground
export const OVERSEAS_PARTS_SHIP_FEE = 20; // flat $20
export const DOMESTIC_PCB_SHIP_FEE = 0; // free
export const OVERSEAS_PCB_SHIP_FEE = 25; // flat $25

// Console log text colors
export const CONSOLE_RED_TEXT = "\x1b[31m%s\x1b[0m";
export const CONSOLE_GREEN_TEXT = "\x1b[32m%s\x1b[0m";
export const CONSOLE_YELLOW_TEXT = "\x1b[33m%s\x1b[0m";

// Database constants
export const DB_NAME = env.NEXT_PUBLIC_DB_NAME;
export const DB_COLLECTIONS = {
	openOrdersCollection: "openOrders",
	closedOrdersCollection: "closedOrders",
	guestCartsCollection: "guestCarts",
	usersCollection: "users",
};
