import { OrderedPcbDetails } from "@/components/order-history/ordered-pcb-details";
import { OrderedPcbNetPrice, OrderedPcbUnitPrice } from "@/components/order-history/ordered-pcb-price-breaks";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getAllPcbs } from "@/lib/utils";
import type { OrderType } from "@/types/order-types";

export function OrderedPcbsTbody(props: { order: OrderType }) {
	const { order } = props;
	const pcbs = getAllPcbs(order.cart);
	return (
		<TableBody>
			{pcbs.map((pcb, pcbIdx) => {
				const serial = pcbIdx + 1;
				return (
					<TableRow key={serial}>
						<TableCell>{serial}</TableCell>
						<TableCell>
							<OrderedPcbDetails
								order={order}
								pcb={pcb}
							/>
						</TableCell>
						<TableCell className="hidden lg:table-cell">{pcb.OrderedQty}</TableCell>
						<TableCell className="hidden lg:table-cell">
							<OrderedPcbUnitPrice
								pcb={pcb}
								order={order}
							/>
						</TableCell>
						<TableCell className="hidden lg:table-cell">
							<OrderedPcbNetPrice
								pcb={pcb}
								order={order}
							/>
						</TableCell>
					</TableRow>
				);
			})}
		</TableBody>
	);
}
