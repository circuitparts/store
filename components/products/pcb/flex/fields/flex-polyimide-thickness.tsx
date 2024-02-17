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
	selectPolyimideThickness,
	selectPolyimideThicknessOptions,
	selectStiffner,
	setPolyimideThickness,
} from "@/lib/redux/reducers/flex-pcb-slice";
import type { FlexPcbPolyimideThicknessType } from "@/types/flex-pcb-types";
import { useDispatch, useSelector } from "react-redux";

export function FlexPolyimideThickness() {
	const dispatch = useDispatch();
	const polyimideThicknessOptions = useSelector(selectPolyimideThicknessOptions);
	const polyimideThickness = useSelector(selectPolyimideThickness);
	const stiffner = useSelector(selectStiffner);

	function handleOnChange(value: FlexPcbPolyimideThicknessType) {
		dispatch(setPolyimideThickness(value));
	}

	return (
		<div hidden={!stiffner.includes("Polyimide")}>
			<Dropdown
				value={polyimideThickness}
				onChange={handleOnChange}>
				<DropdownLabel>
					Polyimide Thickness (mm) <PolyimideThicknessTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{polyimideThickness}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{polyimideThicknessOptions.map((option, optionIdx) => (
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

function PolyimideThicknessTip() {
	return (
		<HelpPopover>
			<p>
				Commonly used on FPCs with gold finger connectors. A deep-brown polyimide layer is attached to the back
				of the gold fingers.
			</p>
		</HelpPopover>
	);
}
