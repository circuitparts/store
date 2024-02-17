import { convertAndFormatCurrencyForOrderHistory } from "@/lib/utils";
import type { OrderType } from "@/types/order-types";
import type { PcbType } from "@/types/pcb-types";

export function OrderedPcbUnitPrice(props: { pcb: PcbType; order: OrderType }) {
	const { pcb, order } = props;
	const { NetPrice, OrderedQty } = pcb;
	const unitPrice = NetPrice / OrderedQty;
	const currency = order.currency;
	const exchangeRate = order.exchangeRate;
	const unitPriceFormatted = convertAndFormatCurrencyForOrderHistory(unitPrice, currency, exchangeRate);
	return <p>{unitPriceFormatted}</p>;
}

export function OrderedPcbNetPrice(props: { pcb: PcbType; order: OrderType }) {
	const { pcb, order } = props;
	const { NetPrice } = pcb;
	const currency = order.currency;
	const exchangeRate = order.exchangeRate;
	const netPriceFormatted = convertAndFormatCurrencyForOrderHistory(NetPrice, currency, exchangeRate);
	return <p>{netPriceFormatted}</p>;
}
