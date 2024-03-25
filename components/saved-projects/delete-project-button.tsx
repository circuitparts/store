"use client";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { useTransition } from "react";

export function DeleteProjectButton({ ...buttonProps }: ButtonProps) {
	const [isLoading, startTransition] = useTransition();

	function handleOnClick() {
		startTransition(async () => {
			throw new Error("Delete function not implemented");
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
