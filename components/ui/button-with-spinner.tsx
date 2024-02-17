import type { ButtonProps } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

interface ButtonWithSpinnerProps extends ButtonProps {
	isLoading: boolean;
	label: string;
}

export function ButtonWithSpinner({ isLoading, label, ...buttonProps }: ButtonWithSpinnerProps) {
	return (
		<Button
			disabled={isLoading}
			{...buttonProps}>
			{isLoading ? (
				<Icons.spinner
					className="animate-spin text-center"
					aria-hidden="true"
				/>
			) : (
				label
			)}
		</Button>
	);
}
