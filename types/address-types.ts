import type { UserType } from "@/types/user-types";

export type BillingAddressType = {
	type: "Billing Address";
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	address1: string;
	address2: string;
	city: string;
	state: string;
	postalCode: string;
	company: string;
	country: string;
	taxId: string;
	po: string;
};

export type ShippingAddressType = {
	type: "Shipping Address";
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	address1: string;
	address2: string;
	city: string;
	state: string;
	postalCode: string;
	company: string;
	country: string;
	sameAsBilling: boolean;
};

export type AddressStoreStateType = {
	billingAddress: BillingAddressType;
	shippingAddress: ShippingAddressType;
	billCountryOptions: string[];
	billStateOptions: string[];
	shipCountryOptions: string[];
	shipStateOptions: string[];
};

export type NewAddressPropsType = {
	billingAddress: BillingAddressType;
	shippingAddress: ShippingAddressType;
};

export type FetchAddressesPropsType = Pick<UserType, "billingAddresses" | "shippingAddresses">;
