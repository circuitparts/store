import { BackOrderedPartsAlert } from "@/components/cart/back-ordered-parts-alert";
import { BasketPartsTable } from "@/components/cart/basket-parts/basket-parts-table";
import { BasketPcbsTable } from "@/components/cart/basket-pcbs/basket-pcbs-table";
import { CheckoutButton } from "@/components/cart/checkout-button";
import { EmptyShoppingCart } from "@/components/cart/empty-shopping-cart";
import { CartPricingSummary } from "@/components/cart/price-summary/cart-pricing-summary";
import { TaxAndShippingEstimateAlert } from "@/components/cart/price-summary/tax-shipping-price-alert";
import { PLATFORM_NAME } from "@/lib/constants/app";
import { CART_HELP_PAGE } from "@/lib/constants/page-routes";
import { fetchCartItemsAction } from "@/lib/server-actions/cart-actions";
import { getAllParts, getAllPcbs } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: `Shopping Cart | ${PLATFORM_NAME}`,
	description: "Checkout your shopping cart items.",
};

export default async function ShoppingCart() {
	const cart = await fetchCartItemsAction();

	if (!cart?.cartSize) {
		return <EmptyShoppingCart />;
	}

	const parts = getAllParts(cart);
	const pcbs = getAllPcbs(cart);

	return (
		<div className="mx-auto max-w-full px-4 sm:px-6">
			<h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
			<div className="mt-8 grid grid-cols-1 gap-y-3 xl:grid-cols-3 xl:gap-x-10">
				<div className="space-y-10 sm:col-span-2">
					<BasketPartsTable parts={parts} />
					<BasketPcbsTable pcbs={pcbs} />
				</div>

				<div className="space-y-4">
					<CartPricingSummary cart={cart} />
					<BackOrderedPartsAlert cart={cart} />
					<TaxAndShippingEstimateAlert />
					<CheckoutButton />
					<p className="mt-2 text-sm text-muted-foreground">
						Need help?{" "}
						<Link
							href={CART_HELP_PAGE}
							target="_blank"
							className="underline">
							Learn How to manage your cart
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
