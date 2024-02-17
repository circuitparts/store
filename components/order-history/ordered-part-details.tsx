import {
	calculatePartNetPrice,
	calculatePartUnitPrice,
	convertAndFormatCurrencyForOrderHistory,
	getAvailableParts,
} from "@/lib/utils";
import type { OrderType } from "@/types/order-types";
import type { PartDataType } from "@/types/part-types";

export function OrderedPartDetails(props: { part: PartDataType; order: OrderType }) {
	const { part } = props;
	return (
		<>
			<p className="font-medium">{part.Name}</p>
			<p className="mt-1 text-muted-foreground">{part.Description}</p>
			<OrderedPartInfoMobileView {...props} />
		</>
	);
}

function OrderedPartInfoMobileView(props: { part: PartDataType; order: OrderType }) {
	const { part } = props;
	return (
		<div className="lg:hidden">
			<div className="mt-1 grid grid-cols-2">
				<p className="text-muted-foreground">Quantity:</p>
				<p className="font-medium">{part.OrderedQty}</p>
			</div>
			<OrderedPartUnitPriceMobileView {...props} />
			<OrderedPartNetPriceMobileView {...props} />
		</div>
	);
}

function OrderedPartUnitPriceMobileView(props: { part: PartDataType; order: OrderType }) {
	const { part, order } = props;
	const availableParts = getAvailableParts(order.cart);
	const currency = order.currency;
	const exchangeRate = order.exchangeRate;
	const unitPrice = calculatePartUnitPrice(availableParts, part.Name);
	const unitPriceFormatted = convertAndFormatCurrencyForOrderHistory(unitPrice, currency, exchangeRate);
	return (
		<div className="mt-1 lg:hidden grid grid-cols-2">
			<p className="text-muted-foreground">Unit Price:</p>
			<p className="font-medium">{unitPriceFormatted}</p>
		</div>
	);
}

function OrderedPartNetPriceMobileView(props: { part: PartDataType; order: OrderType }) {
	const { part, order } = props;
	const currency = order.currency;
	const exchangeRate = order.exchangeRate;
	const netPrice = calculatePartNetPrice(part);
	const netPriceFormatted = convertAndFormatCurrencyForOrderHistory(netPrice, currency, exchangeRate);
	return (
		<div className="mt-1 lg:hidden grid grid-cols-2">
			<p className="text-muted-foreground">Net Price:</p>
			<p className="font-medium">{netPriceFormatted}</p>
		</div>
	);
}
