import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Icons } from "@/components/ui/icons";

export function TaxAndShippingEstimateAlert() {
	return (
		<Alert>
			<Icons.ImWarning className="h-4 w-4" />
			<AlertTitle className="font-semibold">Heads up!</AlertTitle>
			<AlertDescription>
				Sales Tax and Shipping Charges are estimated at the time of checkout. Actual totals may vary based on
				the tax rate and shipping method selected.
			</AlertDescription>
		</Alert>
	);
}
