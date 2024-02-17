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
	selectStainlessSteelThickness,
	selectStainlessSteelThicknessOptions,
	selectStiffner,
	setStainlessSteelThickness,
} from "@/lib/redux/reducers/flex-pcb-slice";
import type { FlexPcbStainlessSteelThicknessType } from "@/types/flex-pcb-types";
import { useDispatch, useSelector } from "react-redux";

export function FlexStainlessSteelThickness() {
	const dispatch = useDispatch();
	const stainlessSteelThicknessOptions = useSelector(selectStainlessSteelThicknessOptions);
	const stainlessSteelThickness = useSelector(selectStainlessSteelThickness);
	const stiffner = useSelector(selectStiffner);

	function handleOnChange(value: FlexPcbStainlessSteelThicknessType) {
		dispatch(setStainlessSteelThickness(value));
	}

	return (
		<div hidden={!stiffner.includes("Stainless Steel")}>
			<Dropdown
				value={stainlessSteelThickness}
				onChange={handleOnChange}>
				<DropdownLabel>
					Stainless Steel Thickness <StainlessSteelTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{stainlessSteelThickness}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{stainlessSteelThicknessOptions.map((option, optionIdx) => (
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

function StainlessSteelTip() {
	return (
		<HelpPopover>
			<p>
				Electro-Deposited (ED) copper is brittle. ED copper can be deposited in thinner layers , which can be
				beneficial in applications where thinner traces are required, and electrodeposited copper is less
				expensive.
			</p>
		</HelpPopover>
	);
}
