import {
	Dropdown,
	DropdownContainer,
	DropdownContent,
	DropdownItem,
	DropdownLabel,
	DropdownOptions,
	DropdownTrigger,
} from "@/components/ui/dropdown-list";
import { selectShipStateOptions, selectShippingAddress, setShippingState } from "@/lib/redux/reducers/address-slice";
import { useDispatch, useSelector } from "react-redux";

export function ShippingState() {
	const dispatch = useDispatch();
	const stateOptions = useSelector(selectShipStateOptions);
	const shippingAddress = useSelector(selectShippingAddress);

	function handleOnChange(value: string) {
		dispatch(setShippingState(value));
	}

	return (
		<div>
			<Dropdown
				value={shippingAddress.state}
				onChange={handleOnChange}>
				<DropdownLabel>State*</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{shippingAddress.state}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{stateOptions.map((option, optionIdx) => (
								<DropdownItem
									key={optionIdx}
									value={option}>
									{option}
								</DropdownItem>
							))}
						</DropdownOptions>
					</DropdownContent>
				</DropdownContainer>
			</Dropdown>
		</div>
	);
}
