import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { selectShippingAddress, setShippingSameAsBilling } from "@/lib/redux/reducers/address-slice";
import { useDispatch, useSelector } from "react-redux";

export function SameShippingAndBillingCheckbox() {
	const dispatch = useDispatch();
	const shippingAddress = useSelector(selectShippingAddress);
	return (
		<div className="mt-6 flex items-center">
			<Input
				type="checkbox"
				name="bill_ship_match"
				checked={shippingAddress.sameAsBilling}
				className="h-4 w-4 rounded border-gray-300 text-gray-950"
				onChange={e => {
					dispatch(setShippingSameAsBilling(e.target.checked));
				}}
			/>
			<div className="ml-2">
				<Label className="text-sm font-medium">Shipping information is same as billing information</Label>
			</div>
		</div>
	);
}
