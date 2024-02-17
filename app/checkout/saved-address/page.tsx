import { AddressDisplayCard } from "@/components/checkout/address/address-display-card";
import { EDIT_ADDRESSES_PAGE, REVIEW_ORDER_PAGE } from "@/lib/constants/page-routes";
import { fetchAddressesAction } from "@/lib/server-actions/checkout-actions";
import { Button } from "@/components/ui/button";
import { PLATFORM_NAME } from "@/lib/constants/app";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: `Saved Addresses | ${PLATFORM_NAME}`,
	description: "View your saved billing and shipping addresses.",
};

export default async function SavedAddresses() {
	const addresses = await fetchAddressesAction();

	const billingAddress = addresses?.billingAddresses[0];
	const shippingAddress = addresses?.shippingAddresses[0];

	if (!addresses || !billingAddress || !shippingAddress) {
		redirect(EDIT_ADDRESSES_PAGE);
	}

	return (
		<div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-2 lg:px-8">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold tracking-tight">Last used Addresses</h1>
				<Button asChild>
					<Link href={EDIT_ADDRESSES_PAGE}>Add new address</Link>
				</Button>
			</div>
			<div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4 my-10">
				<AddressDisplayCard address={billingAddress} />
				<AddressDisplayCard address={shippingAddress} />
			</div>
			<Button
				asChild
				className="w-full">
				<Link href={REVIEW_ORDER_PAGE}>Review Order</Link>
			</Button>
		</div>
	);
}
