import { PartInformation } from "@/components/products/part/part-information";
import { PartOrderForm } from "@/components/products/part/part-order-form";
import { PartPricingTable } from "@/components/products/part/part-pricing-table";
import { PartDetailSkeleton } from "@/components/ui/part-detail-skeleton";
import { getPartsAction } from "@/lib/server-actions/get-parts-action";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata({ params }: { params: { query: string } }): Promise<Metadata> {
	return {
		title: params.query,
	};
}

export default async function PartDetail({ params: { query } }: { params: { query: string } }) {
	const response = await getPartsAction(query);
	const parts = response.Parts;
	const partData = parts[query];

	if (Object.keys(parts).length === 0) {
		return notFound();
	}

	return (
		<Suspense fallback={<PartDetailSkeleton />}>
			<div className="px-4 py-0 space-y-8 sm:px-6 sm:py-10 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8">
				<PartInformation partData={partData} />
				<PartPricingTable partData={partData} />
				<PartOrderForm partData={partData} />
			</div>
		</Suspense>
	);
}
