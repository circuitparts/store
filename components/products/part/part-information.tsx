import { Icons } from "@/components/ui/icons";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { PART_OUT_OF_STOCK_STATUSES } from "@/lib/constants/app";
import { cn } from "@/lib/utils";
import type { PartDataType } from "@/types/part-types";
import Link from "next/link";

export function PartInformation({ partData }: { partData: PartDataType }) {
	const { Description, DatasheetUrl, Availability, Name, Manufacturer, Category, ROHSStatus, Min, Mult } = partData;
	return (
		<div>
			<div className="mt-4">
				<h1 className="text-3xl font-bold tracking-tight">{Name}</h1>
			</div>

			<section className="mt-4">
				<div className="mt-4 space-y-6">
					<p className="text-muted-foreground">{Description}</p>
				</div>

				<Table className="mt-5">
					<TableBody>
						<TableRow className="border-b-0">
							<TableCell className="text-muted-foreground divide-none">Manufacturer</TableCell>
							<TableCell>{Manufacturer}</TableCell>
						</TableRow>
						<TableRow className="border-b-0">
							<TableCell className="text-muted-foreground">Category</TableCell>
							<TableCell>{Category}</TableCell>
						</TableRow>
						<TableRow className="border-b-0">
							<TableCell className="text-muted-foreground">RoHS Status</TableCell>
							<TableCell>{ROHSStatus === "" ? "NA" : ROHSStatus}</TableCell>
						</TableRow>
						<TableRow className="border-b-0">
							<TableCell className="text-muted-foreground">Minimum Order Quantity</TableCell>
							<TableCell>{Min} No.(s)</TableCell>
						</TableRow>
						<TableRow className="border-b-0">
							<TableCell className="text-muted-foreground">Buy in Multiples of</TableCell>
							<TableCell>{Mult} No.(s)</TableCell>
						</TableRow>
						<TableRow className="border-b-0">
							<TableCell className="text-muted-foreground">Availability</TableCell>
							<TableCell
								className={cn("font-medium", {
									"text-red-500 font-bold": PART_OUT_OF_STOCK_STATUSES.some(status =>
										Availability.includes(status)
									),
								})}>
								{Availability}
							</TableCell>
						</TableRow>
						<TableRow className="border-b-0">
							<TableCell className="text-muted-foreground">Datasheet</TableCell>
							<TableCell>
								<Link
									className="hover:underline text-gray-500"
									target="_blank"
									href={DatasheetUrl}>
									<div className="flex gap-x-1">
										<Icons.Download className="mt-1" /> Datasheet
									</div>
								</Link>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</section>
		</div>
	);
}
