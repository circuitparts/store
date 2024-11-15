import { PartResultTableBody } from "@/components/products/part/part-result-tbody";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { getPartsAction } from "@/lib/server-actions/get-parts-action";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata({ params }: { params: { query: string } }): Promise<Metadata> {
	return {
		title: params.query,
	};
}
type PartResultsType = {
	params: {
		query: string;
	};
};

export default async function PartResults({ params: { query } }: PartResultsType) {
	const response = await getPartsAction(query);
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if(response === null) {
		return notFound();
	}
	const parts = response.Parts;
	const partNumbers = Object.keys(parts);

	if (partNumbers.length === 0) {
		return notFound();
	}

	return (
		<div className="mt-4 space-y-6">
			<h1
				data-testid="part-results-title"
				className="scroll-m-20 text-2xl font-semibold tracking-tight">
				Parts matching {decodeURIComponent(query)}
			</h1>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">S.No.</TableHead>
						<TableHead className="w-[300px]">Part Number</TableHead>
						<TableHead className="w-[500px] hidden lg:table-cell">Description</TableHead>
						<TableHead className="w-[200px] hidden sm:table-cell">Datasheet</TableHead>
						<TableHead className="hidden sm:table-cell">Availability</TableHead>
					</TableRow>
				</TableHeader>
				<Suspense fallback={<TableSkeleton />}>
					<PartResultTableBody parts={parts} />
				</Suspense>
			</Table>
		</div>
	);
}
