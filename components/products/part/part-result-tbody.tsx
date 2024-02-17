"use client";
import { PartResultMobileView } from "@/components/products/part/part-result-mobile";
import { PART_DETAILS_PAGE } from "@/lib/constants/page-routes";
import { Icons } from "@/components/ui/icons";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { PartDataType } from "@/types/part-types";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function PartResultTableBody(props: { parts: Record<string, PartDataType> }) {
	const { parts } = props;
	const partNumbers = Object.keys(parts);
	const router = useRouter();

	return (
		<TableBody>
			{partNumbers.map((partNumber, index) => {
				const part = parts[partNumber];
				const { Description, DatasheetUrl, Availability } = part;
				let stock = "";
				if (Availability === "None" || Availability === "Not Stocked") {
					stock = "Out of Stock";
				} else {
					stock = "In Stock";
				}
				return (
					<TableRow
						key={partNumber}
						className="cursor-pointer"
						onClick={() => router.push(PART_DETAILS_PAGE + partNumber)}>
						<TableCell className="font-medium">{index + 1}</TableCell>
						<TableCell>
							{partNumber}
							<PartResultMobileView
								Description={Description}
								DatasheetUrl={DatasheetUrl}
								Availability={Availability}
								stock={stock}
							/>
						</TableCell>
						<TableCell className="hidden lg:table-cell">{Description}</TableCell>
						<TableCell className="hidden sm:table-cell">
							<Link
								className="hover:underline text-gray-500"
								target="_blank"
								href={DatasheetUrl}>
								<div className="flex gap-x-1">
									<Icons.Download className="mt-1" /> Datasheet
								</div>
							</Link>
						</TableCell>
						<TableCell
							className={cn("hidden sm:table-cell font-medium", {
								"text-red-500": Availability === "None" || Availability === "Not Stocked",
							})}>
							{stock}
						</TableCell>
					</TableRow>
				);
			})}
		</TableBody>
	);
}
