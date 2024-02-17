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
	selectBoardOutlineTolerance,
	selectBoardOutlineToleranceOptions,
	selectLayer,
	setBoardOutlineTolerance,
} from "@/lib/redux/reducers/rigid-pcb-slice";
import { useDispatch } from "@/lib/redux/store";
import type { RigidPcbBoardOutlineToleranceType } from "@/types/rigid-pcb-types";
import { useSelector } from "react-redux";

export function RigidBoardOutlineTolerance() {
	const dispatch = useDispatch();
	const boardOutlineToleranceOptions = useSelector(selectBoardOutlineToleranceOptions);
	const boardOutlineTolerance = useSelector(selectBoardOutlineTolerance);
	const layer = useSelector(selectLayer);
	const baseMaterial = useSelector(selectBaseMaterial);

	const isHidden = (baseMaterial === "FR4" && layer < 2) || baseMaterial === "Rogers";

	function handleOnChange(value: RigidPcbBoardOutlineToleranceType) {
		dispatch(setBoardOutlineTolerance(value));
	}

	return (
		<div hidden={isHidden}>
			<Dropdown
				value={boardOutlineTolerance}
				onChange={handleOnChange}>
				<DropdownLabel>
					Board Outline Tolerance <BoardoutlineToleranceTip />
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

function BoardoutlineToleranceTip() {
	return (
		<HelpPopover>
			<p>
				Regular and precision CNC routing differ mainly in how the PCB is aligned and the number of routing
				passes. In regular routing, a panel is fastened at points outside individual PCBs,whereas in precision
				routing alignment holes within each board are used for positioning. Regular routing is a single-pass
				process, while precision routing includes a rough pass and then a fine pass.
			</p>
		</HelpPopover>
	);
}
