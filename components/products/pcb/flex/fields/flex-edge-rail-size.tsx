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
	selectEdgeRailSize,
	selectEdgeRailSizeOptions,
	selectEdgeRails,
	setEdgeRailSize,
} from "@/lib/redux/reducers/flex-pcb-slice";
import type { FlexPcbEdgeRailSizeType } from "@/types/flex-pcb-types";
import { useDispatch, useSelector } from "react-redux";

export function FlexEdgeRailsSize() {
	const dispatch = useDispatch();
	const edgeRailSize = useSelector(selectEdgeRailSize);
	const edgeRailSizeOptions = useSelector(selectEdgeRailSizeOptions);
	const designFormat = useSelector(selectDesignFormat);
	const edgeRails = useSelector(selectEdgeRails);

	function handleOnChange(value: FlexPcbEdgeRailSizeType) {
		dispatch(setEdgeRailSize(value));
	}

	return (
		<div hidden={designFormat === "Single PCB" || designFormat === "Panel by Customer" || edgeRails === "No"}>
			<Dropdown
				value={edgeRailSize}
				onChange={handleOnChange}>
				<DropdownLabel>
					Edge Rails Size (mm) <EdgeRailSizeTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{edgeRailSize}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{edgeRailSizeOptions.map((option, optionIdx) => (
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

function EdgeRailSizeTip() {
	return (
		<HelpPopover>
			<p>Edge rails that are added for increasing component-to-board-edge clearances are to be at least 5mm.</p>
		</HelpPopover>
	);
}
