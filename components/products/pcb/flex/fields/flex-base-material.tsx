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
import { selectBaseMaterial, selectBaseMaterialOptions, setBaseMaterial } from "@/lib/redux/reducers/flex-pcb-slice";
import type { FlexPcbBaseMaterialType } from "@/types/flex-pcb-types";
import { useDispatch, useSelector } from "react-redux";

export function FlexBaseMaterial() {
	const dispatch = useDispatch();
	const baseMaterialOptions = useSelector(selectBaseMaterialOptions);
	const baseMaterial = useSelector(selectBaseMaterial);

	function handleOnChange(value: FlexPcbBaseMaterialType) {
		dispatch(setBaseMaterial(value));
	}

	return (
		<div>
			<Dropdown
				value={baseMaterial}
				onChange={handleOnChange}>
				<DropdownLabel>
					Base Material <BaseMaterialTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{baseMaterial}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{baseMaterialOptions.map((option, optionIdx) => (
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

function BaseMaterialTip() {
	return (
		<HelpPopover>
			Flex PCBs utilize a thin, flexible polymer film as the substrate for the circuitry. Flex PCBs reduce space
			consumption, and have lower weight.
		</HelpPopover>
	);
}
