import { OrderedPcbsTbody } from "@/components/order-history/ordered-pcbs-tbody";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { OrderType } from "@/types/order-types";

export async function OrderedPcbsTable(props: { order: OrderType }) {
	const { order } = props;
	return (
		<div>
			<h3 className="text-lg font-semibold">PCB Fabrication / Assembly</h3>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[10px]">S.No.</TableHead>
						<TableHead>PCB Fabrication/Assembly Details</TableHead>
						<TableHead className="w-[230px] hidden lg:table-cell">Quantity</TableHead>
						<TableHead className="w-[100px] hidden lg:table-cell">Unit Price</TableHead>
						<TableHead className="w-[100px] hidden lg:table-cell">Net Price</TableHead>
					</TableRow>
				</TableHeader>
				<OrderedPcbsTbody order={order} />
			</Table>
		</div>
	);
}
