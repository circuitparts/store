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
} from "@/lib/redux/reducers/rigid-pcb-slice";
import { useDispatch } from "@/lib/redux/store";
import type { RigidPcbPanelQtyType } from "@/types/rigid-pcb-types";
import { useSelector } from "react-redux";

export function RigidPanelQuantity() {
	const dispatch = useDispatch();
	const panelQtyOptions = useSelector(selectPanelQtyOptions);
	const panelQty = useSelector(selectPanelQty);
	const designFormat = useSelector(selectDesignFormat);

	function handleOnChange(value: RigidPcbPanelQtyType) {
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
