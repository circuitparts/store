import Loading from "@/app/loading";
import { EditAddressForm } from "@/components/checkout/address/edit-address-form";
import { PLATFORM_NAME } from "@/lib/constants/app";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: `Edit Addresses | ${PLATFORM_NAME}`,
	description: "Edit your billing and shipping addresses.",
};

export default function EditAddress() {
	return (
		<div className="mx-auto max-w-4xl px-4 py-2 sm:px-6 lg:px-8">
			<h1 className="text-3xl font-bold tracking-tight">Billing and Shipping Information</h1>
			<div className="space-y-10 mt-8">
				<Suspense fallback={<Loading />}>
					<EditAddressForm />
				</Suspense>
			</div>
		</div>
	);
}
