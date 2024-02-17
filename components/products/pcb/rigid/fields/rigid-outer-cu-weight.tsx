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
	selectOuterCuWeight,
	selectOuterCuWeightOptions,
	setOuterCuWeight,
} from "@/lib/redux/reducers/rigid-pcb-slice";
import { useDispatch } from "@/lib/redux/store";
import type { RigidPcbOuterCuWeightType } from "@/types/rigid-pcb-types";
import { useSelector } from "react-redux";

export function RigidOuterCuWeight() {
	const dispatch = useDispatch();
	const outerCuWeightOptions = useSelector(selectOuterCuWeightOptions);
	const outerCuWeight = useSelector(selectOuterCuWeight);

	function handleOnChange(value: RigidPcbOuterCuWeightType) {
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
				Copper weight on the outer layers(top and bottom). The copper weight for inner layers is 0.5 oz by
				default.
			</p>
		</HelpPopover>
	);
}
