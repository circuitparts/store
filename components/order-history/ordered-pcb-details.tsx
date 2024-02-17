import ViewPcbFabSpecsModal from "@/components/products/pcb/view-pcb-fab-specs-modal";
import { convertAndFormatCurrencyForOrderHistory } from "@/lib/utils";
import type { OrderType } from "@/types/order-types";
import type { PcbType } from "@/types/pcb-types";

export function OrderedPcbDetails(props: { pcb: PcbType; order: OrderType }) {
	const { pcb } = props;
	return (
		<>
			<div className="flex space-x-2">
				<p>PCB Name:</p>
				<p>{pcb.Name}</p>
			</div>
			<OrderedPcbInfoMobileView {...props} />
			<ViewPcbFabSpecsModal fabSpecs={pcb} />
		</>
	);
}

function OrderedPcbInfoMobileView(props: { pcb: PcbType; order: OrderType }) {
	const { pcb } = props;
	return (
		<div className="lg:hidden">
			<div className="mt-1 grid grid-cols-2">
				<p className="text-muted-foreground">Category:</p>
				<p className="font-medium">{pcb.Category}</p>
				<p className="text-muted-foreground">Quantity:</p>
				<p className="font-medium">{pcb.OrderedQty} No.(s)</p>
			</div>
			<OrderedPcbUnitPriceMobileView {...props} />
		</div>
	);
}

function OrderedPcbUnitPriceMobileView(props: { pcb: PcbType; order: OrderType }) {
	const { pcb, order } = props;
	const { NetPrice, OrderedQty } = pcb;
	const unitPrice = NetPrice / OrderedQty;
	const currency = order.currency;
	const exchangeRate = order.exchangeRate;
	const unitPriceFormatted = convertAndFormatCurrencyForOrderHistory(unitPrice, currency, exchangeRate);
	return (
		<div className="mt-1 lg:hidden grid grid-cols-2">
			<p className="text-muted-foreground">Unit Price:</p>
			<p className="font-medium">{unitPriceFormatted}</p>
		</div>
	);
}

export function OrderedPcbNetPriceMobileView(props: { pcb: PcbType; order: OrderType }) {
	const { pcb, order } = props;
	const { NetPrice } = pcb;
	const currency = order.currency;
	const exchangeRate = order.exchangeRate;
	const netPriceFormatted = convertAndFormatCurrencyForOrderHistory(NetPrice, currency, exchangeRate);
	return (
		<div className="mt-1 lg:hidden grid grid-cols-2">
			<p className="text-muted-foreground">Net Price:</p>
			<p className="font-medium">{netPriceFormatted}</p>
		</div>
	);
}
