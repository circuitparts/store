import { convertAndFormatCurrencyForOrderHistory } from "@/lib/utils";
import type { OrderType } from "@/types/order-types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function OrderHistoryOverview(props: { order: OrderType }) {
	const { order } = props;
	return (
		<div className="my-4 border border-gray-200 px-4 py-6 sm:rounded-lg sm:p-6 md:flex md:items-center md:justify-between md:space-x-6 lg:space-x-8">
			<div className="flex-auto space-y-4 divide-y divide-gray-200 text-sm text-muted-foreground md:grid md:grid-cols-4 md:gap-x-6 md:space-y-0 md:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
				<div className="flex justify-between md:block">
					<p className="font-medium text-gray-900">Order number</p>
					<p className="md:mt-1">{order.id}</p>
				</div>
				<div className="flex justify-between pt-4 md:block md:pt-0">
					<p className="font-medium text-gray-900">Date placed</p>
					<p className="md:mt-1">{order.createdAt.toLocaleString()}</p>
				</div>
				<div className="flex justify-between pt-4 font-medium md:block md:pt-0 text-gray-900">
					<p>Total amount</p>
					<p className="md:mt-1">
						{convertAndFormatCurrencyForOrderHistory(order.cartTotal, order.currency, order.exchangeRate)}
					</p>
				</div>
				<div className="flex justify-between pt-4 font-medium md:block md:pt-0 text-gray-900">
					<p>Status</p>
					<p className="md:mt-1">{order.status}</p>
				</div>
			</div>
			<div className="space-y-3 space-x-3 md:space-x-0 lg:space-x-3">
				<Button
					variant={"outline"}
					asChild>
					<Link href={`/order-history/view-order/${order.id}`}>View Order</Link>
				</Button>
				<Button
					disabled
					variant={"outline"}>
					Download Invoice
				</Button>
			</div>
		</div>
	);
}
