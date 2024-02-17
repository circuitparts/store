"use client";
import { BillingAddressFields } from "@/components/checkout/address/billing-address-fields";
import { SameShippingAndBillingCheckbox } from "@/components/checkout/address/same-ship-bill-checkbox";
import ShippingAddressFields from "@/components/checkout/address/shipping-address-fields";
import { ButtonWithSpinner } from "@/components/ui/button-with-spinner";
import { REVIEW_ORDER_PAGE } from "@/lib/constants/page-routes";
import {
	selectBillingAddress,
	selectShippingAddress,
	selectShippingSameAsBilling,
} from "@/lib/redux/reducers/address-slice";
import { addAddressesAction } from "@/lib/server-actions/checkout-actions";
import { handleApiRequestError } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useTransition, type FormEvent } from "react";
import { useSelector } from "react-redux";

export function EditAddressForm() {
	const router = useRouter();
	const [isLoading, startTransition] = useTransition();
	const isShippingSameAsBilling = useSelector(selectShippingSameAsBilling);
	const billingAddress = useSelector(selectBillingAddress);
	const shippingAddress = useSelector(selectShippingAddress);

	function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
		startTransition(async () => {
			e.preventDefault();
			try {
				await addAddressesAction({ billingAddress, shippingAddress });
			} catch (error: unknown) {
				throw handleApiRequestError(error, "EDIT ADDRESS FORM / ADD ADDRESSES FAULT"); // activates closest error boundary
			}
			router.push(REVIEW_ORDER_PAGE);
		});
	}

	return (
		<form onSubmit={handleOnSubmit}>
			<BillingAddressFields />
			<SameShippingAndBillingCheckbox />

			{/* Conditional Shipping Address */}
			{!isShippingSameAsBilling && <ShippingAddressFields />}

			{/* Submit Button */}
			<ButtonWithSpinner
				isLoading={isLoading}
				label={"Review Order"}
				type="submit"
				className="mt-8 w-full"
			/>
		</form>
	);
}
