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
	selectBaseMaterial,
	selectThermalConductivity,
	selectThermalConductivityOptions,
	setThermalConductivity,
} from "@/lib/redux/reducers/rigid-pcb-slice";
import { useDispatch } from "@/lib/redux/store";
import type { RigidPcbThermalConductivityType } from "@/types/rigid-pcb-types";
import { useSelector } from "react-redux";

export function RigidThermalConductivity() {
	const dispatch = useDispatch();
	const baseMaterial = useSelector(selectBaseMaterial);
	const thermalConductivity = useSelector(selectThermalConductivity);
	const thermalConductivityOptions = useSelector(selectThermalConductivityOptions);

	const hiddenOptions = ["Aluminum", "CopperCore"];

	function handleOnChange(value: RigidPcbThermalConductivityType) {
		dispatch(setThermalConductivity(value));
	}

	return (
		<div hidden={!hiddenOptions.includes(baseMaterial)}>
			<Dropdown
				value={thermalConductivity}
				onChange={handleOnChange}>
				<DropdownLabel>
					Thermal Conductivity (Watts) <ThermalConductivityTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{thermalConductivity}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{thermalConductivityOptions.map((option, optionIdx) => (
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

function ThermalConductivityTip() {
	return (
		<HelpPopover>
			The thermal conductivity of a material is a measure of its ability to conduct heat. It is commonly denoted
			by k,λ, or K.
		</HelpPopover>
	);
}
