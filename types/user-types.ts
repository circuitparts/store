import type { BillingAddressType, ShippingAddressType } from "@/types/address-types";
import type { CartDataType } from "@/types/cart-types";
import type { OrderType } from "@/types/order-types";

export type UserType = {
	createdAt: Date;
	userId: string;
	email: string;
	firstName: string;
	lastName: string;
	cart: CartDataType;
	billingAddresses: BillingAddressType[];
	shippingAddresses: ShippingAddressType[];
	orders: OrderType[];
	s3FileDir: string | null;
};

export type SignupPropsType = Pick<UserType, "userId" | "firstName" | "lastName" | "email">;
