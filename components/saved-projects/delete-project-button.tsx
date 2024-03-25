"use client";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { useToast } from "@/components/ui/use-toast";
import { deleteProjectAction } from "@/lib/server-actions/saved-project-actions";
import type { DeleteProjectButtonProps } from "@/types/delete-button-types";
import { useTransition } from "react";

export function DeleteProjectButton({ projectName, ...buttonProps }: DeleteProjectButtonProps) {
	const [isLoading, startTransition] = useTransition();
	const { toast } = useToast();

	function handleOnClick() {
		startTransition(async () => {
			await deleteProjectAction(projectName);
			toast({
				variant: "default",
				title: "Success",
				description: `Your project "${projectName}" has been successfully deleted.`,
				duration: 5000,
			});
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
