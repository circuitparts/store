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
	selectBaseMaterial,
	selectBoardThickness,
	selectBoardThicknessOptions,
	setBoardThickness,
} from "@/lib/redux/reducers/rigid-pcb-slice";
import { useDispatch } from "@/lib/redux/store";
import type { RigidPcbBoardThicknessType } from "@/types/rigid-pcb-types";
import { useSelector } from "react-redux";

export function RigidBoardThickness() {
	const dispatch = useDispatch();
	const boardThicknessOptions = useSelector(selectBoardThicknessOptions);
	const boardThickness = useSelector(selectBoardThickness);
	const baseMaterial = useSelector(selectBaseMaterial);

	function handleOnChange(value: RigidPcbBoardThicknessType) {
		dispatch(setBoardThickness(value));
	}

	return (
		<div>
			<Dropdown
				value={boardThickness}
				onChange={handleOnChange}>
				<DropdownLabel>
					PCB Thickness (mm) <BoardThicknessTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{boardThickness}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{boardThicknessOptions.map((option, optionIdx) => (
								<DropdownItem
									key={optionIdx}
									value={option}>
									{baseMaterial === "Rogers" ? option.toFixed(2) : option.toFixed(1)}
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
			<p>The thickness of finished board. Board thickness tolerance is ±10%.</p>
		</HelpPopover>
	);
}
