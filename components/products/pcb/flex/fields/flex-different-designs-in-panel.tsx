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
import { selectDifferentDesignsInPanel, setDifferentDesignsInPanel } from "@/lib/redux/reducers/flex-pcb-slice";
import { selectDifferentDesignsInPanelOptions } from "@/lib/redux/reducers/rigid-pcb-slice";
import type { FlexPcbDifferentDesignsInPanelType } from "@/types/flex-pcb-types";
import { useDispatch, useSelector } from "react-redux";

export function FlexDifferentDesignsInPanel() {
	const dispatch = useDispatch();
	const differentDesignsInPanelOptions = useSelector(selectDifferentDesignsInPanelOptions);
	const differentDesignsInPanel = useSelector(selectDifferentDesignsInPanel);

	function handleOnChange(value: FlexPcbDifferentDesignsInPanelType) {
		dispatch(setDifferentDesignsInPanel(value));
	}

	return (
		<div>
			<Dropdown
				value={differentDesignsInPanel}
				onChange={handleOnChange}>
				<DropdownLabel>
					Different Designs in Panel <DifferentDesignsTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{differentDesignsInPanel}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{differentDesignsInPanelOptions.map((option, optionIdx) => (
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

function DifferentDesignsTip() {
	return (
		<HelpPopover>
			<p>
				How many different designs in your files separated by v-cuts, stamp holes or milling slots. For example:
				1 Design, 2 Designs or 3 Designs etc.
			</p>
		</HelpPopover>
	);
}
