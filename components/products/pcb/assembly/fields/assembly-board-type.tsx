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
import { selectBoardType, selectBoardTypeOptions, setBoardType } from "@/lib/redux/reducers/pcb-assembly-slice";
import type { PcbAssemblyBoardType } from "@/types/pcb-assembly-types";
import { useDispatch, useSelector } from "react-redux";

export function AssemblyBoardType() {
	const dispatch = useDispatch();
	const boardTypeOptions = useSelector(selectBoardTypeOptions);
	const boardType = useSelector(selectBoardType);

	function handleOnChange(value: PcbAssemblyBoardType) {
		dispatch(setBoardType(value));
	}

	return (
		<div className="w-full">
			<Dropdown
				value={boardType}
				onChange={handleOnChange}>
				<DropdownLabel>
					Board Type <BoardTypeTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{boardType}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{boardTypeOptions.map((option, optionIdx) => (
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

function BoardTypeTip() {
	return (
		<HelpPopover>
			<p>This is the design you supply to us.</p>
		</HelpPopover>
	);
}
