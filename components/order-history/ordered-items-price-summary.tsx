import {
	calculateCartSubtotal,
	calculateSalesTax,
	convertAndFormatCurrencyForOrderHistory,
	getShippingCost,
} from "@/lib/utils";
import type { OrderType } from "@/types/order-types";

export async function OrderedItemsPriceSummary(props: { order: OrderType }) {
	const { order } = props;
	const cart = order.cart;
	const currency = order.currency;
	const exchangeRate = order.exchangeRate;

	// shipping
	const shippingAddress = order.shippingAddress;
	const shippingCountry = shippingAddress.country;
	const { partShippingCost, pcbShippingCost } = getShippingCost(shippingCountry, cart);
	const pcbShippingCostFormatted = convertAndFormatCurrencyForOrderHistory(pcbShippingCost, currency, exchangeRate);
	const partsShippingCostFormatted = convertAndFormatCurrencyForOrderHistory(
		partShippingCost,
		currency,
		exchangeRate
	);

	// cart value
	const cartValue = calculateCartSubtotal(cart);
	const subTotal = convertAndFormatCurrencyForOrderHistory(cartValue, currency, exchangeRate);
	const totalOrderValue = cartValue + partShippingCost + pcbShippingCost;

	// tax
	const tax = calculateSalesTax(totalOrderValue);
	const taxFormatted = convertAndFormatCurrencyForOrderHistory(tax, currency, exchangeRate);
	const totalOrderValueWithTax = totalOrderValue + tax;

	// total order value
	const orderTotalWithShipping = convertAndFormatCurrencyForOrderHistory(
		totalOrderValueWithTax,
		currency,
		exchangeRate
	);

	return (
		<div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
			<h2 className="text-xl mb-8 font-semibold tracking-tight">Order Summary</h2>
			<div className="flow-root">
				<div className="-my-4 divide-y divide-gray-300 text-sm">
					<div className="flex items-center justify-between py-4">
						<p className="font-medium">Subtotal</p>
						<p className="font-medium text-end">{subTotal}</p>
					</div>
					<div className="flex items-center justify-between py-4">
						<div>
							<p className="font-medium mb-2">Shipping</p>
							<p className="my-1">Components</p>
							<p className="my-1">PCBs</p>
						</div>
						<div className="text-end">
							<p className="mb-2"></p>
							<p className="font-medium my-1">{partsShippingCostFormatted}</p>
							<p className="font-medium my-1">{pcbShippingCostFormatted}</p>
						</div>
					</div>
					<div className="flex items-center justify-between py-4">
						<p className="font-medium">Sales Tax</p>
						<p className="font-medium text-end">{taxFormatted}</p>
					</div>
					<div className="flex items-center justify-between py-4">
						<p className="text-base font-medium">Order total</p>
						<p className="text-base font-medium text-end">{orderTotalWithShipping}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
