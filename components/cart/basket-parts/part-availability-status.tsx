import { BackorderedComponentsTip } from "@/components/order-history/back-ordered-components-tip";
import { PART_OUT_OF_STOCK_STATUSES } from "@/lib/constants/app";

export function AvailabilityStatus(props: { Availability: string }) {
	const { Availability } = props;
	return (
		<div className="flex space-x-1">
			<p
				className={
					PART_OUT_OF_STOCK_STATUSES.some(status => Availability.includes(status)) ? "text-red-500" : ""
				}>
				{PART_OUT_OF_STOCK_STATUSES.some(status => Availability.includes(status))
					? "Back Order"
					: "Ready to Ship"}
			</p>
			<div className={PART_OUT_OF_STOCK_STATUSES.some(status => Availability.includes(status)) ? "" : "hidden"}>
				<BackorderedComponentsTip />
			</div>
		</div>
	);
}
