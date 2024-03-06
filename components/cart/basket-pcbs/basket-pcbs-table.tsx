import { BasketPcbsTbody } from "@/components/cart/basket-pcbs/basket-pcbs-tbody";
import { DeleteAllCartItemsButton } from "@/components/cart/delete-buttons";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import type { PcbType } from "@/types/pcb-types";
import { Suspense } from "react";

export async function BasketPcbsTable(props: { pcbs: PcbType[] }) {
	const { pcbs } = props;
	return (
		<div>
			<h3 className="text-lg font-semibold">PCB Fabrication/Assembly</h3>
			<Table>
				<TableHeader>
					<TableRow data-testid="basket-pcbs-thead-row">
						<TableHead className="w-[10px]">S.No.</TableHead>
						<TableHead>PCB Fabrication/Assembly Details</TableHead>
						<TableHead className="w-[230px] hidden lg:table-cell">Quantity</TableHead>
						<TableHead className="w-[100px] hidden lg:table-cell">Unit Price</TableHead>
						<TableHead className="w-[100px] hidden lg:table-cell">Net Price</TableHead>
						<TableHead className="w-[30px]">
							<DeleteAllCartItemsButton itemType={"PCB"} />
						</TableHead>
					</TableRow>
				</TableHeader>
				<Suspense fallback={<TableSkeleton />}>
					<BasketPcbsTbody pcbs={pcbs} />
				</Suspense>
			</Table>
		</div>
	);
}
