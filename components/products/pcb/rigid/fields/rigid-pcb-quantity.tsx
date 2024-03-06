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
import { selectDesignFormat, selectPcbQty, selectPcbQtyOptions, setPcbQty } from "@/lib/redux/reducers/rigid-pcb-slice";
import { useDispatch } from "@/lib/redux/store";
import type { RigidPcbPcbQtyType } from "@/types/rigid-pcb-types";
import { useSelector } from "react-redux";

export function RigidPcbQuantity() {
	const dispatch = useDispatch();
	const pcbQtyOptions = useSelector(selectPcbQtyOptions);
	const pcbQty = useSelector(selectPcbQty);
	const designFormat = useSelector(selectDesignFormat);

	function handleOnChange(value: RigidPcbPcbQtyType) {
		dispatch(setPcbQty(value));
	}

	return (
		<div
			hidden={designFormat !== "Single PCB"}
			className="w-full">
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
