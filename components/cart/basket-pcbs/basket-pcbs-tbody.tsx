import { PcbNetPrice, PcbUnitPrice } from "@/components/cart/basket-pcbs/basket-pcb-price-breaks";
import { PcbDetails } from "@/components/cart/basket-pcbs/pcb-details";
import { DeleteCartItemButton } from "@/components/cart/delete-buttons";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { PcbType } from "@/types/pcb-types";

export function BasketPcbsTbody(props: { pcbs: PcbType[] }) {
	const { pcbs } = props;
	if (!pcbs.length) {
		return (
			<TableBody>
				<TableRow>
					<TableCell
						className="text-center text-muted-foreground"
						colSpan={6}>
						You&apos;ve not added any PCBs to your cart
					</TableCell>
				</TableRow>
			</TableBody>
		);
	}
	return (
		<TableBody>
			{pcbs.map((pcb, pcbIdx) => {
				const serialNum = pcbIdx + 1;
				const { Name, Type, OrderedQty } = pcb;
				return (
					<TableRow key={serialNum}>
						<TableCell>{serialNum}</TableCell>
						<TableCell>
							<PcbDetails pcb={pcb} />
						</TableCell>
						<TableCell className="hidden lg:table-cell">{OrderedQty} No.(s)</TableCell>
						<TableCell className="hidden lg:table-cell">
							<PcbUnitPrice pcb={pcb} />
						</TableCell>
						<TableCell className="hidden lg:table-cell">
							<PcbNetPrice pcb={pcb} />
						</TableCell>
						<TableCell>
							<DeleteCartItemButton
								itemName={Name}
								itemType={Type}
							/>
						</TableCell>
					</TableRow>
				);
			})}
		</TableBody>
	);
}
