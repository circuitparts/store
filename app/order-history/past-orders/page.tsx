import { EmptyOrderHistory } from "@/components/order-history/empty-order-history";
import { OrderHistoryOverview } from "@/components/order-history/order-history-overview";
import { fetchUserOrdersAction } from "@/lib/server-actions/order-history-actions";
import { PLATFORM_NAME } from "@/lib/constants/app";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: `Order History | ${PLATFORM_NAME}`,
	description: "Check the status of recent orders, manage returns, and download invoices.",
};

export default async function PastOrders() {
	const orders = await fetchUserOrdersAction();

	//most recent first
	const sortedOrders = orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

	if (sortedOrders.length === 0) {
		return <EmptyOrderHistory />;
	}

	return (
		<div className="mx-auto max-w-6xl sm:px-6 sm:mb-80">
			<div className="px-4 sm:px-0">
				<h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Order history</h1>
				<p className="mt-2 text-sm text-muted-foreground">
					Check the status of recent orders, manage returns, and download invoices.
				</p>
			</div>
			{sortedOrders.map(order => (
				<OrderHistoryOverview
					key={order.id}
					order={order}
				/>
			))}
		</div>
	);
}
