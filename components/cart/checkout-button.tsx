"use client";
import { ButtonWithSpinner } from "@/components/ui/button-with-spinner";
import { ADDRESSES_PAGE } from "@/lib/constants/page-routes";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function CheckoutButton() {
	const router = useRouter();
	const [isLoading, startTransition] = useTransition();

	function handleOnClick() {
		startTransition(() => {
			router.push(ADDRESSES_PAGE);
		});
	}

	return (
		<ButtonWithSpinner
			isLoading={isLoading}
			label={"Checkout"}
			className="w-full"
			onClick={handleOnClick}
		/>
	);
}
