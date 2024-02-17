import { BackorderedComponentsTip } from "@/components/order-history/back-ordered-components-tip";
import { BackOrderedPartsTbody } from "@/components/order-history/back-ordered-parts-tbody";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { OrderType } from "@/types/order-types";

export async function BackOrderedPartsTable(props: { order: OrderType }) {
	const { order } = props;
	return (
		<div>
			<div className="flex space-x-2">
				<h3 className="text-lg font-semibold">Back Ordered Components</h3>
				<BackorderedComponentsTip />
			</div>
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
				<BackOrderedPartsTbody order={order} />
			</Table>
		</div>
	);
}
