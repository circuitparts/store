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
import {
	selectDesignFormat,
	selectPanelQty,
	selectPanelQtyOptions,
	setPanelQty,
} from "@/lib/redux/reducers/flex-pcb-slice";
import type { FlexPcbPanelQtyType } from "@/types/flex-pcb-types";
import { useDispatch, useSelector } from "react-redux";

export function FlexPanelQuantity() {
	const dispatch = useDispatch();
	const panelQtyOptions = useSelector(selectPanelQtyOptions);
	const panelQty = useSelector(selectPanelQty);
	const designFormat = useSelector(selectDesignFormat);

	function handleOnChange(value: FlexPcbPanelQtyType) {
		dispatch(setPanelQty(value));
	}

	return (
		<div hidden={designFormat === "Single PCB"}>
			<Dropdown
				value={panelQty}
				onChange={handleOnChange}>
				<DropdownLabel>
					Panel Quantity <PanelQtyTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{panelQty}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{panelQtyOptions.map((option, optionIdx) => (
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

function PanelQtyTip() {
	return (
		<HelpPopover>
			<p>The quantity of Panels you need.</p>
		</HelpPopover>
	);
}
