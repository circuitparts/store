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
import { selectOuterCuWeight, selectOuterCuWeightOptions, setOuterCuWeight } from "@/lib/redux/reducers/flex-pcb-slice";
import type { FlexPcbOuterCuWeightType } from "@/types/flex-pcb-types";
import { useDispatch, useSelector } from "react-redux";

export function FlexOuterCuWeight() {
	const dispatch = useDispatch();
	const outerCuWeightOptions = useSelector(selectOuterCuWeightOptions);
	const outerCuWeight = useSelector(selectOuterCuWeight);

	function handleOnChange(value: FlexPcbOuterCuWeightType) {
		dispatch(setOuterCuWeight(value));
	}

	return (
		<div>
			<Dropdown
				value={outerCuWeight}
				onChange={handleOnChange}>
				<DropdownLabel>
					Outer Copper Weight <OuterCuWeightTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{outerCuWeight}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{outerCuWeightOptions.map((option, optionIdx) => (
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

function OuterCuWeightTip() {
	return (
		<HelpPopover>
			<p>
				The copper thickness on outer layers, in ounces (oz) Single-sided FPC: 0.07 mm FPC uses 0.5 oz (18 μm);
				0.11 mm FPC uses 1 oz (35 μm). Double-sided FPC: 0.11 mm FPC uses 1/3 oz (12 μm); 0.12 mm FPC uses 0.5
				oz (18 μm); 0.2 mm FPC uses 1 oz (35 μm).
			</p>
		</HelpPopover>
	);
}
