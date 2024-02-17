import {
	getAllParts,
	calculatePartUnitPrice,
	convertAndFormatCurrencyForOrderHistory,
	calculatePartNetPrice,
} from "@/lib/utils";
import type { OrderType } from "@/types/order-types";
import type { PartDataType } from "@/types/part-types";

export function OrderedPartUnitPrice(props: { part: PartDataType; order: OrderType }) {
	const { order, part } = props;
	const parts = getAllParts(order.cart);
	const currency = order.currency;
	const exchangeRate = order.exchangeRate;
	const unitPrice = calculatePartUnitPrice(parts, part.Name);
	const unitPriceFormatted = convertAndFormatCurrencyForOrderHistory(unitPrice, currency, exchangeRate);
	return <p>{unitPriceFormatted}</p>;
}

export function OrderedPartNetPrice(props: { part: PartDataType; order: OrderType }) {
	const { part, order } = props;
	const currency = order.currency;
	const exchangeRate = order.exchangeRate;
	const netPrice = calculatePartNetPrice(part);
	const netPriceFormatted = convertAndFormatCurrencyForOrderHistory(netPrice, currency, exchangeRate);
	return <p>{netPriceFormatted}</p>;
}
