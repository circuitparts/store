import { CONTACT_US_PAGE, ORDER_HISTORY_PAGE } from "@/lib/constants/page-routes";
import { PLATFORM_NAME } from "@/lib/constants/app";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: `Order Placed | ${PLATFORM_NAME}`,
	description: "Your order was successfully placed.",
};

export default function OrderSuccess() {
	return (
		<div>
			<div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
						Your order was placed successfully! 🎉
					</h2>
					<p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
						Thanks for placing an order with us. Our team will check your order and will notify you via
						email. You can also check your order status in your order history as well.
					</p>
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<Button asChild>
							<Link href={ORDER_HISTORY_PAGE}>Go to Order History</Link>
						</Button>
						<Link
							href={CONTACT_US_PAGE}
							className="text-sm font-semibold text-gray-900">
							Contact support <span aria-hidden="true">&rarr;</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
