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
	selectTurnaroundTime,
	selectTurnaroundTimeOptions,
	setLeadTime,
} from "@/lib/redux/reducers/pcb-assembly-slice";
import type { PcbAssemblyTurnaroundTimeType } from "@/types/pcb-assembly-types";
import { useDispatch, useSelector } from "react-redux";

export function AssemblyTurnAroundTime() {
	const dispatch = useDispatch();
	const turnaroundTimeOptions = useSelector(selectTurnaroundTimeOptions);
	const turnaroundTime = useSelector(selectTurnaroundTime);

	function handleOnChange(value: PcbAssemblyTurnaroundTimeType) {
		dispatch(setLeadTime(value));
	}

	return (
		<div>
			<Dropdown
				value={turnaroundTime}
				onChange={handleOnChange}>
				<DropdownLabel>
					Turnaround Time <TurnAroundTimeTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{turnaroundTime}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{turnaroundTimeOptions.map((option, optionIdx) => (
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

function TurnAroundTimeTip() {
	return (
		<HelpPopover>
			<p>The time it takes to ship your boards.</p>
		</HelpPopover>
	);
}
