import { BASE_APP_URL } from "@/lib/constants/app";

export const HOME_PAGE = "/";

// API endpoints
export const ORDER_NOTIFICATION_EMAIL_ENDPOINT = `${BASE_APP_URL}/api/order-email`;
export const SIGNUP_NOTIFICATION_EMAIL_ENDPOINT = `${BASE_APP_URL}/api/signup-email`;
export const UPLOAD_FILE_API_ENDPOINT = BASE_APP_URL + "/api/upload-file";
export const BOM_PARSER_API_ENDPOINT = "/api/bom-parser";
export const STRIPE_CHECKOUT_API_ENDPOINT = "/api/stripe-checkout";
export const STRIPE_CHECKOUT_SESSION_API_ENDPOINT = "/api/stripe-checkout?session_id=";

// product pages
export const PRODUCTS_PAGE = "/products";
export const PART_RESULTS_PAGE = "/products/part/result/";
export const PART_DETAILS_PAGE = "/products/part/detail/";
export const RIGID_PCB_FAB_PAGE = "/products/pcb/rigid-pcb";
export const FLEX_PCB_FAB_PAGE = "/products/pcb/flex-pcb";
export const PCB_ASSEMBLY_PAGE = "/products/pcb/assembly";
export const PCB_TECH_CAPABILITIES_PAGE = "/products/pcb/capabilities";
export const INVENTORY_MANAGEMENT_PAGE = "/coming-soon";
export const UPLOAD_BOM_PAGE = "/products/part/bom";

// auth pages
export const AUTH_PAGES = "/auth";
export const LOGIN_PAGE = "/auth/login";
export const SIGNUP_PAGE = "/auth/signup";
export const VERIFY_EMAIL_PAGE = "/auth/signup/verify-email";
export const RESET_PASSWORD_PAGE = "/auth/reset-password";
export const RESET_PASSWORD_STEP_2_PAGE = "/auth/reset-password/step2";
export const CHANGE_PASSWORD_PAGE = "/auth/change-password";
export const ACCOUNT_PAGE = "/account";

// cart & checkout pages
export const SHOPPING_CART_PAGE = "/cart";
export const ADDRESSES_PAGE = "/checkout/saved-address";
export const EDIT_ADDRESSES_PAGE = "/checkout/edit-address";
export const REVIEW_ORDER_PAGE = "/checkout/review-order";
export const STRIPE_CHECKOUT_PAGE = "/checkout/stripe-checkout";
export const ORDER_SUCCESS_PAGE = "/order-status/success";
export const ORDER_FAILED_PAGE = "/order-status/failed";

// order history pages
export const ORDER_HISTORY_PAGE = "/order-history/past-orders";
export const VIEW_ORDER_DETAILS = "/order-history/view-order/";

// static pages
export const PRIVACY_POLICY_PAGE = "/privacy-policy";
export const TERMS_AND_CONDITIONS_PAGE = "/terms-and-conditions";
export const SHIPPING_AND_RETURNS_PAGE = "/shipping-and-returns";
export const CONTACT_US_PAGE = "/contact-us";
export const COMING_SOON_PAGE = "/coming-soon";
