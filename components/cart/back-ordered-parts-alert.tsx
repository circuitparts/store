import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Icons } from "@/components/ui/icons";
import { getBackOrderedParts } from "@/lib/utils";
import type { CartDataType } from "@/types/cart-types";

export function BackOrderedPartsAlert(props: { cart: CartDataType | null }) {
	const { cart } = props;
	if (!cart) return null;
	const backOrderedParts = getBackOrderedParts(cart);
	return (
		<Alert hidden={!backOrderedParts.length}>
			<Icons.ImWarning className="h-4 w-4" />
			<AlertTitle className="font-semibold">Heads up!</AlertTitle>
			<AlertDescription>
				Parts that are not in stock will be back ordered and shipped separately. Make sure to note them down.
			</AlertDescription>
		</Alert>
	);
}
