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
	selectInnerCuWeight,
	selectInnerCuWeightOptions,
	selectLayer,
	setInnerCuWeight,
} from "@/lib/redux/reducers/rigid-pcb-slice";
import { useDispatch } from "@/lib/redux/store";
import type { RigidPcbInnerCuWeightType } from "@/types/rigid-pcb-types";
import { useSelector } from "react-redux";

export function RigidInnerCuWeight() {
	const dispatch = useDispatch();
	const innerCuWeightOptions = useSelector(selectInnerCuWeightOptions);
	const innerCuWeight = useSelector(selectInnerCuWeight);
	const layer = useSelector(selectLayer);

	function handleOnChange(value: RigidPcbInnerCuWeightType) {
		dispatch(setInnerCuWeight(value));
	}

	return (
		<div hidden={layer < 4}>
			<Dropdown
				value={innerCuWeight}
				onChange={handleOnChange}>
				<DropdownLabel>
					Inner Copper Weight <InnerCuWeightTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{innerCuWeight}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{innerCuWeightOptions.map((option, optionIdx) => (
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

function InnerCuWeightTip() {
	return (
		<HelpPopover>
			<p>Copper weight on the inner layers. The copper weight for inner layers is 0.5 oz by default.</p>
		</HelpPopover>
	);
}
