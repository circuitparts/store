import { BackOrderedPartsAlert } from "@/components/cart/back-ordered-parts-alert";
import { BasketPartsTable } from "@/components/cart/basket-parts/basket-parts-table";
import { BasketPcbsTable } from "@/components/cart/basket-pcbs/basket-pcbs-table";
import { EmptyShoppingCart } from "@/components/cart/empty-shopping-cart";
import { AddressDisplayCard } from "@/components/checkout/address/address-display-card";
import { CheckoutPricingSummary } from "@/components/checkout/pricing/checkout-pricing-summary";
import { EDIT_ADDRESSES_PAGE, STRIPE_CHECKOUT_PAGE } from "@/lib/constants/page-routes";
import { fetchCartItemsAction } from "@/lib/server-actions/cart-actions";
import { fetchAddressesAction } from "@/lib/server-actions/checkout-actions";
import { Button } from "@/components/ui/button";
import { PLATFORM_NAME } from "@/lib/constants/app";
import { getAllParts, getAllPcbs } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: `Review Order | ${PLATFORM_NAME}`,
	description: "Review your cart itesm and proceed to checkout.",
};

export default async function ReviewOrder() {
	const cart = await fetchCartItemsAction();
	const addresses = await fetchAddressesAction();

	if (!cart?.cartSize) {
		return <EmptyShoppingCart />;
	}

	const parts = getAllParts(cart);
	const pcbs = getAllPcbs(cart);

	const billingAddress = addresses?.billingAddresses[0];
	const shippingAddress = addresses?.shippingAddresses[0];

	if (!billingAddress || !shippingAddress) {
		return redirect(EDIT_ADDRESSES_PAGE);
	}

	return (
		<div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-2 lg:px-8">
			<h1 className="text-3xl font-bold tracking-tight">Review Order</h1>
			<div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4 my-10">
				<AddressDisplayCard address={billingAddress} />
				<AddressDisplayCard address={shippingAddress} />
			</div>

			<div className="space-y-10">
				<BasketPartsTable parts={parts} />
				<BasketPcbsTable pcbs={pcbs} />
			</div>

			<div className="mt-10 flex justify-end">
				<div className="w-full md:w-1/2 px-6 space-y-2">
					<CheckoutPricingSummary
						cart={cart}
						shipAddress={shippingAddress}
					/>
					<BackOrderedPartsAlert cart={cart} />
					<Button
						asChild
						className="w-full my-2">
						<Link href={STRIPE_CHECKOUT_PAGE}>Pay Now</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
