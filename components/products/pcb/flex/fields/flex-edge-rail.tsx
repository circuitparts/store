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
	selectEdgeRails,
	selectEdgeRailsOptions,
	setEdgeRails,
} from "@/lib/redux/reducers/flex-pcb-slice";
import type { FlexPcbEdgeRailsType } from "@/types/flex-pcb-types";
import { useDispatch, useSelector } from "react-redux";

export function FlexEdgeRails() {
	const dispatch = useDispatch();
	const edgeRailOptions = useSelector(selectEdgeRailsOptions);
	const edgeRails = useSelector(selectEdgeRails);
	const designFormat = useSelector(selectDesignFormat);

	function handleOnChange(value: FlexPcbEdgeRailsType) {
		dispatch(setEdgeRails(value));
	}

	return (
		<div hidden={designFormat === "Single PCB" || designFormat === "Panel by Customer"}>
			<Dropdown
				value={edgeRails}
				onChange={handleOnChange}>
				<DropdownLabel>
					Edge Rails <EdgeRailsTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{edgeRails}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{edgeRailOptions.map((option, optionIdx) => (
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

function EdgeRailsTip() {
	return (
		<HelpPopover>
			<p>
				Edge rails are added for increasing component-to-board-edge clearances. Edge rails that are added for
				increasing component-to-board-edge clearances are to be at least 5mm.
			</p>
		</HelpPopover>
	);
}
