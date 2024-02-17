import type { ButtonProps } from "@/components/ui/button";

export interface DeleteCartItemButtonProps extends ButtonProps {
	itemName: string;
	itemType: "PCB" | "Part";
}

export interface DeleteAllCartItemsButtonProps extends ButtonProps {
	itemType: "PCB" | "Part";
}
