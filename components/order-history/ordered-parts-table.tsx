import { OrderedPartsTbody } from "@/components/order-history/ordered-parts-tbody";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { OrderType } from "@/types/order-types";

export async function OrderedPartsTable(props: { order: OrderType }) {
	const { order } = props;
	return (
		<div>
			<h3 className="text-lg font-semibold">Components</h3>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[10px]">S.No.</TableHead>
						<TableHead>Component Details</TableHead>
						<TableHead className="w-[230px] hidden lg:table-cell">Quantity</TableHead>
						<TableHead className="w-[100px] hidden lg:table-cell">Unit Price</TableHead>
						<TableHead className="w-[100px] hidden lg:table-cell">Net Price</TableHead>
					</TableRow>
				</TableHeader>
				<OrderedPartsTbody order={order} />
			</Table>
		</div>
	);
}
