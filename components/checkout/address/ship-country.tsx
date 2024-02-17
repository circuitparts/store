import {
	Dropdown,
	DropdownContainer,
	DropdownContent,
	DropdownItem,
	DropdownLabel,
	DropdownOptions,
	DropdownTrigger,
} from "@/components/ui/dropdown-list";
import {
	selectShipCountryOptions,
	selectShippingAddress,
	setShippingCountry,
} from "@/lib/redux/reducers/address-slice";
import { useDispatch, useSelector } from "react-redux";

export function ShippingCountry() {
	const dispatch = useDispatch();
	const countryOptions = useSelector(selectShipCountryOptions);
	const shippingAddress = useSelector(selectShippingAddress);

	function handleOnChange(value: string) {
		dispatch(setShippingCountry(value));
	}

	return (
		<div>
			<Dropdown
				value={shippingAddress.country}
				onChange={handleOnChange}>
				<DropdownLabel>Country*</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{shippingAddress.country}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{countryOptions.map((option, optionIdx) => (
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
