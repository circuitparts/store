import { Icons } from "@/components/ui/icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function PcbPriceEstimateAlert() {
	return (
		<Alert>
			<Icons.ImWarning className="h-4 w-4" />
			<AlertTitle className="font-semibold">Heads up!</AlertTitle>
			<AlertDescription>
				The displayed prices are for estimation purposes only and may be subject to change upon the review of
				your files by our team.
			</AlertDescription>
		</Alert>
	);
}
