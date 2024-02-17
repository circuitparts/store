import {
	Dropdown,
	DropdownContainer,
	DropdownContent,
	DropdownItem,
	DropdownLabel,
	DropdownOptions,
	DropdownTrigger,
} from "@/components/ui/dropdown-list";
import { selectBillingAddress, selectBillStateOptions, setBillingState } from "@/lib/redux/reducers/address-slice";
import { useDispatch, useSelector } from "react-redux";

export function BillingState() {
	const dispatch = useDispatch();
	const stateOptions = useSelector(selectBillStateOptions);
	const billingAddress = useSelector(selectBillingAddress);

	function handleOnChange(value: string) {
		dispatch(setBillingState(value));
	}

	return (
		<div>
			<Dropdown
				value={billingAddress.state}
				onChange={handleOnChange}>
				<DropdownLabel>State*</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{billingAddress.state}</DropdownTrigger>
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
