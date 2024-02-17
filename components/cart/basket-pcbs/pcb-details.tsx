import { PcbUnitPriceMobileView } from "@/components/cart/basket-pcbs/basket-pcb-price-breaks";
import ViewPcbFabSpecsModal from "@/components/products/pcb/view-pcb-fab-specs-modal";
import type { PcbType } from "@/types/pcb-types";

export function PcbDetails(props: { pcb: PcbType }) {
	const { pcb } = props;
	const { Name, Category } = pcb;
	return (
		<>
			<div className="flex space-x-2">
				<p className="w-20 font-medium">PCB Name:</p>
				<p>{Name}</p>
			</div>
			<div className="hidden lg:flex space-x-2">
				<p className="w-20 font-medium">Category:</p>
				<p>{Category}</p>
			</div>
			<PcbInformationMobileView pcb={pcb} />
			<ViewPcbFabSpecsModal fabSpecs={pcb} />
		</>
	);
}

function PcbInformationMobileView(props: { pcb: PcbType }) {
	const { pcb } = props;
	const { Category } = pcb;
	const isRigidOrFlexPcb = Category === "Rigid PCB" || Category === "Flex PCB";
	let quantity;
	if (isRigidOrFlexPcb) {
		if (pcb.DesignFormat === "Single PCB") {
			quantity = pcb.PcbQty;
		} else {
			quantity = pcb.SinglePiecesQty; // total pcbs ordered in case of panelized pcb
		}
	} else {
		quantity = pcb.OrderedQty; // pcb assembly quantity
	}
	return (
		<div className="lg:hidden">
			<div className="mt-1 grid grid-cols-2">
				<p className="text-muted-foreground">Category:</p>
				<p className="font-medium">{Category}</p>
				<p className="text-muted-foreground">Quantity:</p>
				<p className="font-medium">{quantity} No.(s)</p>
			</div>
			<div className="mt-1 lg:hidden grid grid-cols-2">
				<p className="text-muted-foreground">Unit Price:</p>
				<PcbUnitPriceMobileView pcb={pcb} />
			</div>
		</div>
	);
}
