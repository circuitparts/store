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
} from "@/lib/redux/reducers/rigid-pcb-slice";
import { useDispatch } from "@/lib/redux/store";
import type { RigidPcbEdgeRailSizeType } from "@/types/rigid-pcb-types";
import { useSelector } from "react-redux";

export function RigidEdgeRailsSize() {
	const dispatch = useDispatch();
	const edgeRailSize = useSelector(selectEdgeRailSize);
	const designFormat = useSelector(selectDesignFormat);
	const edgeRails = useSelector(selectEdgeRails);
	const edgeRailSizeOptions = useSelector(selectEdgeRailSizeOptions);

	const isHidden = designFormat === "Single PCB" || designFormat === "Panel by Customer" || edgeRails === "No";

	function handleOnChange(value: RigidPcbEdgeRailSizeType) {
		dispatch(setEdgeRailSize(value));
	}

	return (
		<div hidden={isHidden}>
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
