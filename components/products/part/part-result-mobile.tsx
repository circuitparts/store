import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function PartResultMobileView(props: {
	Description: string;
	DatasheetUrl: string;
	Availability: string;
	stock: string;
}) {
	const { Description, DatasheetUrl, Availability, stock } = props;
	return (
		<div className="font-normal lg:hidden">
			<p className="mt-1 sm:w-64 md:w-80">{Description}</p>
			<p className="mt-1 sm:hidden">
				<Link
					className="hover:underline text-gray-500"
					target="_blank"
					href={DatasheetUrl}>
					<div className="flex gap-x-1">
						<Icons.Download className="mt-1" /> Datasheet
					</div>
				</Link>
			</p>
			<div className="sm:hidden flex gap-x-2">
				<p className="font-medium">Availability:</p>
				<p
					className={cn("mt-1 font-medium", {
						"text-red-500": Availability === "None" || Availability === "Not Stocked",
					})}>
					{stock}
				</p>
			</div>
		</div>
	);
}
