import type { BillingAddressType, ShippingAddressType } from "@/types/address-types";
import type { CartDataType } from "@/types/cart-types";
import type { CurrencyType } from "@/types/currency-types";
import type { Unwrap } from "@/types/unwrap";

export type OrderStatusType = "Placed" | "Processing" | "Shipped" | "Complete" | "Cancelled" | "Rejected";

export type OrderType = {
	id: string;
	createdAt: Date;
	status: OrderStatusType;
	cartValue: number;
	discountCode: string;
	discountValue: number;
	tax: number;
	shippingCost: number;
	cartTotal: number;
	paymentId: string;
	shipper: string | null;
	awb: string | null;
	billingAddress: BillingAddressType;
	shippingAddress: ShippingAddressType;
	cart: CartDataType;
	remarks: string | null;
	currency: CurrencyType;
	exchangeRate: number;
};

export type OpenOrderType = Unwrap<
	OrderType & {
		userId: string | null;
		notes: string | null;
	}
>;
