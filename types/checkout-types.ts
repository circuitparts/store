import type { UserType } from "@/types/user-types";

export type CheckoutDataPropsType = Pick<UserType, "cart" | "billingAddresses" | "shippingAddresses">;
