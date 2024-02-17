import {
	Dropdown,
	DropdownContainer,
	DropdownContent,
	DropdownItem,
	DropdownLabel,
	DropdownOptions,
	DropdownTrigger,
} from "@/components/ui/dropdown-list";
import { selectBillingAddress, selectBillCountryOptions, setBillingCountry } from "@/lib/redux/reducers/address-slice";
import { useDispatch, useSelector } from "react-redux";

export function BillingCountry() {
	const dispatch = useDispatch();
	const countryOptions = useSelector(selectBillCountryOptions);
	const billingAddress = useSelector(selectBillingAddress);

	function handleOnChange(value: string) {
		dispatch(setBillingCountry(value));
	}

	return (
		<div>
			<Dropdown
				value={billingAddress.country}
				onChange={handleOnChange}>
				<DropdownLabel>Country*</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{billingAddress.country}</DropdownTrigger>
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
