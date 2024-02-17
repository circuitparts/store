import { AddressDisplayCard } from "@/components/checkout/address/address-display-card";
import { BackOrderedPartsTable } from "@/components/order-history/back-ordered-parts-table";
import FetchOrderDetailsError from "@/components/order-history/order-fetch-error";
import { OrderedItemsPriceSummary } from "@/components/order-history/ordered-items-price-summary";
import { OrderedPartsTable } from "@/components/order-history/ordered-parts-table";
import { OrderedPcbsTable } from "@/components/order-history/ordered-pcbs-table";
import { fetchUserOrdersAction } from "@/lib/server-actions/order-history-actions";
import { PLATFORM_NAME } from "@/lib/constants/app";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: `Order History | ${PLATFORM_NAME}`,
	description: "Check the status of recent orders, manage returns, and download invoices.",
};

export default async function ViewOrder({ params: { orderNum } }: { params: { orderNum: string } }) {
	const orders = await fetchUserOrdersAction();
	const order = orders.find(order => order.id === orderNum);

	if (!order) return <FetchOrderDetailsError />;

	const { billingAddress, shippingAddress } = order;

	return (
		<div className="mx-auto max-w-full px-4 sm:px-6">
			<h1 className="text-2xl font-bold">Order Number : {orderNum}</h1>
			<p className="text-xl my-2">
				<span className="font-semibold">Order Status:</span> {order.status}
			</p>
			<div className="mt-8 grid grid-cols-1 gap-y-3 xl:grid-cols-3 xl:gap-x-10">
				<div className="space-y-10 sm:col-span-2">
					<OrderedPartsTable order={order} />
					<BackOrderedPartsTable order={order} />
					<OrderedPcbsTable order={order} />
				</div>
				<div>
					<OrderedItemsPriceSummary order={order} />
					<div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8 space-y-8">
						<AddressDisplayCard address={billingAddress} />
						<AddressDisplayCard address={shippingAddress} />
					</div>
				</div>
			</div>
		</div>
	);
}
