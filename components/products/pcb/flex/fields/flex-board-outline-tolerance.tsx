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
	selectBoardOutlineTolerance,
	selectBoardOutlineToleranceOptions,
	selectLayer,
	setBoardOutlineTolerance,
} from "@/lib/redux/reducers/flex-pcb-slice";
import type { FlexPcbBoardOutlineToleranceType } from "@/types/flex-pcb-types";
import { useDispatch, useSelector } from "react-redux";

export function FlexBoardOutlineTolerance() {
	const dispatch = useDispatch();
	const boardOutlineToleranceOptions = useSelector(selectBoardOutlineToleranceOptions);
	const boardOutlineTolerance = useSelector(selectBoardOutlineTolerance);
	const layer = useSelector(selectLayer);

	function handleOnChange(value: FlexPcbBoardOutlineToleranceType) {
		dispatch(setBoardOutlineTolerance(value));
	}

	return (
		<div hidden={layer < 2}>
			<Dropdown
				value={boardOutlineTolerance}
				onChange={handleOnChange}>
				<DropdownLabel>
					Board Outline Tolerance <BoardOutlineTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{boardOutlineTolerance}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{boardOutlineToleranceOptions.map((option, optionIdx) => (
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

function BoardOutlineTip() {
	return (
		<HelpPopover>
			<p>The final boardoutline tolerance</p>
		</HelpPopover>
	);
}
