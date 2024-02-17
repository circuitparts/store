import { OrderedPartDetails } from "@/components/order-history/ordered-part-details";
import { OrderedPartNetPrice, OrderedPartUnitPrice } from "@/components/order-history/ordered-part-price-breaks";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getBackOrderedParts } from "@/lib/utils";
import type { OrderType } from "@/types/order-types";

export function BackOrderedPartsTbody(props: { order: OrderType }) {
	const { order } = props;
	const backOrderedParts = getBackOrderedParts(order.cart);

	return (
		<TableBody>
			{backOrderedParts.map((part, partIdx) => {
				const serial = partIdx + 1;
				return (
					<TableRow key={serial}>
						<TableCell>{serial}</TableCell>
						<TableCell>
							<OrderedPartDetails
								part={part}
								order={order}
							/>
						</TableCell>
						<TableCell className="hidden lg:table-cell">{part.OrderedQty}</TableCell>
						<TableCell className="hidden lg:table-cell">
							<OrderedPartUnitPrice
								part={part}
								order={order}
							/>
						</TableCell>
						<TableCell className="hidden lg:table-cell">
							<OrderedPartNetPrice
								part={part}
								order={order}
							/>
						</TableCell>
					</TableRow>
				);
			})}
		</TableBody>
	);
}
