import { BasketPartsTbody } from "@/components/cart/basket-parts/basket-parts-tbody";
import { DeleteAllCartItemsButton } from "@/components/cart/delete-buttons";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import type { PartDataType } from "@/types/part-types";
import { Suspense } from "react";

export async function BasketPartsTable(props: { parts: PartDataType[] }) {
	const { parts } = props;
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
						<TableHead className="w-[30px]">
							<DeleteAllCartItemsButton itemType={"Part"} />
						</TableHead>
					</TableRow>
				</TableHeader>
				<Suspense fallback={<TableSkeleton />}>
					<BasketPartsTbody parts={parts} />
				</Suspense>
			</Table>
		</div>
	);
}
