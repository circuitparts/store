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
	selectFr4Thickness,
	selectFr4ThicknessOptions,
	selectStiffner,
	setFr4Thickness,
} from "@/lib/redux/reducers/flex-pcb-slice";
import type { FlexPcbFR4ThicknessType } from "@/types/flex-pcb-types";
import { useDispatch, useSelector } from "react-redux";

export function FlexFR4Thickness() {
	const dispatch = useDispatch();
	const fr4ThicknessOptions = useSelector(selectFr4ThicknessOptions);
	const fr4Thickness = useSelector(selectFr4Thickness);
	const stiffner = useSelector(selectStiffner);

	function handleOnChange(value: FlexPcbFR4ThicknessType) {
		dispatch(setFr4Thickness(value));
	}

	return (
		<div hidden={!stiffner.includes("FR4")}>
			<Dropdown
				value={fr4Thickness}
				onChange={handleOnChange}>
				<DropdownLabel>
					FR4 Thickness <FR4ThicknessTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{fr4Thickness}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{fr4ThicknessOptions.map((option, optionIdx) => (
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

function FR4ThicknessTip() {
	return (
		<HelpPopover>
			<p>
				FR4 is often used on low-cost products to support component placement. Some dust may remain from cutting
				the FR4.
			</p>
		</HelpPopover>
	);
}
