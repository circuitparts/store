import type { FlexPcbFabSpecsType } from "@/types/flex-pcb-types";
import type { PartDataType } from "@/types/part-types";
import type { PcbAssemblyFabSpecsType } from "@/types/pcb-assembly-types";
import type { RigidPcbFabSpecsType } from "@/types/rigid-pcb-types";

export type CartDataType = {
	createdAt?: Date;
	updatedAt?: Date;
	cartId?: string; // used only with guest carts
	cartSize: number;
	cartItems: CartItemsType;
};
export type CartItemType = PartDataType | FlexPcbFabSpecsType | RigidPcbFabSpecsType | PcbAssemblyFabSpecsType;

export type CartItemsType = CartItemType[];

export type UpdatePartQtyPropsType = {
	name: string;
	newQty: number;
};
