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
	selectBoardThickness,
	selectBoardThicknessOptions,
	setBoardThickness,
} from "@/lib/redux/reducers/flex-pcb-slice";
import type { FlexPcbBoardThicknessType } from "@/types/flex-pcb-types";
import { useDispatch, useSelector } from "react-redux";

export function FlexBoardThickness() {
	const dispatch = useDispatch();
	const boardThicknessOptions = useSelector(selectBoardThicknessOptions);
	const boardThickness = useSelector(selectBoardThickness);

	function handleOnChange(value: FlexPcbBoardThicknessType) {
		dispatch(setBoardThickness(value));
	}

	return (
		<div>
			<Dropdown
				value={boardThickness}
				onChange={handleOnChange}>
				<DropdownLabel>
					Flex PCB Thickness (mm) <BoardThicknessTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{boardThickness}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{boardThicknessOptions.map((option, optionIdx) => (
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

function BoardThicknessTip() {
	return (
		<HelpPopover>
			<p>The thickness of finished flex PCB. Board thickness tolerance is ±10%.</p>
		</HelpPopover>
	);
}
