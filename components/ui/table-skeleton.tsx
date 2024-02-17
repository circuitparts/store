import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

function SkeletonRow() {
	return (
		<TableRow className="border-b-0">
			<TableCell
				colSpan={5}
				className="py-6">
				<div className="space-y-2">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-3/4" />
				</div>
			</TableCell>
		</TableRow>
	);
}

export function TableSkeleton() {
	return (
		<TableBody>
			<SkeletonRow />
			<SkeletonRow />
		</TableBody>
	);
}
