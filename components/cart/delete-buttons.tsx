"use client";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { deleteAllItemsAction, deleteCartItemAction } from "@/lib/server-actions/cart-actions";
import { deleteAllDesignFilesFromS3, deleteDesignFileFromS3 } from "@/lib/server-actions/s3-actions";
import type { DeleteAllCartItemsButtonProps, DeleteCartItemButtonProps } from "@/types/delete-button-types";
import { useTransition } from "react";

export function DeleteCartItemButton({ itemName, itemType, ...buttonProps }: DeleteCartItemButtonProps) {
	const [isLoading, startTransition] = useTransition();

	function handleOnClick() {
		startTransition(async () => {
			await deleteCartItemAction(itemName);
			// if the item is a PCB, delete its design file from S3
			if (itemType === "PCB") {
				await deleteDesignFileFromS3(itemName);
			}
		});
	}

	return (
		<Button
			disabled={isLoading}
			size={"sm"}
			variant={"ghost"}
			onClick={handleOnClick}
			{...buttonProps}>
			{isLoading ? (
				<Icons.spinner
					className="animate-spin text-center text-muted-foreground"
					aria-hidden="true"
				/>
			) : (
				<Icons.Delete
					className="h-5 w-5 text-muted-foreground"
					aria-hidden="true"
				/>
			)}
		</Button>
	);
}

export function DeleteAllCartItemsButton({ itemType, ...buttonProps }: DeleteAllCartItemsButtonProps) {
	const [isLoading, startTransition] = useTransition();

	function handleOnClick() {
		startTransition(async () => {
			if (itemType === "PCB") {
				await deleteAllItemsAction(itemType);
				await deleteAllDesignFilesFromS3();
			} else {
				await deleteAllItemsAction(itemType);
			}
		});
	}

	return (
		<Button
			disabled={isLoading}
			size={"sm"}
			variant={"ghost"}
			onClick={handleOnClick}
			{...buttonProps}>
			{isLoading ? (
				<Icons.spinner
					className="animate-spin text-center text-muted-foreground"
					aria-hidden="true"
				/>
			) : (
				<Icons.Delete
					className="h-5 w-5 text-muted-foreground"
					aria-hidden="true"
				/>
			)}
		</Button>
	);
}
