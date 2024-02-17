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
	selectStiffner,
	selectThreeMTapeThickness,
	selectThreeMTapeThicknessOptions,
	setThreeMTapeThickness,
} from "@/lib/redux/reducers/flex-pcb-slice";
import type { FlexPcbThreeMTapeThicknessType } from "@/types/flex-pcb-types";
import { useDispatch, useSelector } from "react-redux";

export function FlexThreeMTapeThickness() {
	const dispatch = useDispatch();
	const threeMTapeThicknessOptions = useSelector(selectThreeMTapeThicknessOptions);
	const threeMTapeThickness = useSelector(selectThreeMTapeThickness);
	const stiffner = useSelector(selectStiffner);

	function handleOnChange(value: FlexPcbThreeMTapeThicknessType) {
		dispatch(setThreeMTapeThickness(value));
	}

	return (
		<div hidden={!stiffner.includes("3M Tape")}>
			<Dropdown
				value={threeMTapeThickness}
				onChange={handleOnChange}>
				<DropdownLabel>
					3M Tape Thickness <ThreeMTapeTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{threeMTapeThickness}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{threeMTapeThicknessOptions.map((option, optionIdx) => (
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

function ThreeMTapeTip() {
	return (
		<HelpPopover>
			<p>
				Flexible PCBs with 3M9077 adhesive tape can be used in the lead-free soldering process (peak temperature
				260°C, ≤ 20 sec.). The protective cover remains largely undamaged and can be easily removed. The low
				outgassing of the adhesive reduces the contamination of electronic components. Please note that 3M468
				and 3M467 cannot be used in the lead-free soldering process.
			</p>
		</HelpPopover>
	);
}
