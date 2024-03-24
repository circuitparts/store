import type { CartItemsType } from "@/types/cart-types";

export type SavedProjectType = {
	name: string;
	createdAt: Date;
	updatedAt: Date;
	cartItems: CartItemsType;
};

