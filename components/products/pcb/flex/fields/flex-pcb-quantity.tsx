"use client";
import { HelpPopover } from "@/components/ui/help-popover";
import {
	Dropdown,
	DropdownContainer,
	DropdownContent,
	DropdownItem,
	DropdownLabel,
	DropdownOptions,
	DropdownTrigger,
} from "@/components/ui/dropdown-list";
import { selectDesignFormat, selectPcbQty, selectPcbQtyOptions, setPcbQty } from "@/lib/redux/reducers/flex-pcb-slice";
import type { FlexPcbPcbQtyType } from "@/types/flex-pcb-types";
import { useDispatch, useSelector } from "react-redux";

export function FlexPcbQuantity() {
	const dispatch = useDispatch();
	const pcbQtyOptions = useSelector(selectPcbQtyOptions);
	const pcbQty = useSelector(selectPcbQty);
	const designFormat = useSelector(selectDesignFormat);

	function handleOnChange(value: FlexPcbPcbQtyType) {
		dispatch(setPcbQty(value));
	}

	return (
		<div
			className="w-full"
			hidden={designFormat !== "Single PCB"}>
			<Dropdown
				value={pcbQty}
				onChange={handleOnChange}>
				<DropdownLabel>
					PCB Quantity <PcbQtyTip />
				</DropdownLabel>
				<DropdownContainer data-testid="pcb-quantity-dropdown">
					<DropdownTrigger>{pcbQty}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{pcbQtyOptions.map((option, optionIdx) => (
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

function PcbQtyTip() {
	return (
		<HelpPopover>
			<p>The quantity of PCBs you need.</p>
		</HelpPopover>
	);
}
