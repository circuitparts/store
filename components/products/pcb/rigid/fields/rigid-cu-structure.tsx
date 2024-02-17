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
	selectCopperStructure,
	selectCopperStructureOptions,
	setCopperStructure,
} from "@/lib/redux/reducers/rigid-pcb-slice";
import { useDispatch } from "@/lib/redux/store";
import type { RigidPcbCopperStructureType } from "@/types/rigid-pcb-types";
import { useSelector } from "react-redux";

export function RigidCopperStructure() {
	const dispatch = useDispatch();
	const copperStructureOptions = useSelector(selectCopperStructureOptions);
	const copperStructure = useSelector(selectCopperStructure);
	const baseMaterial = useSelector(selectBaseMaterial);

	function handleOnChange(value: RigidPcbCopperStructureType) {
		dispatch(setCopperStructure(value));
	}

	return (
		<div hidden={!(baseMaterial === "CopperCore")}>
			<Dropdown
				value={copperStructure}
				onChange={handleOnChange}>
				<DropdownLabel>
					Copper Structure <CuStructureTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{copperStructure}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{copperStructureOptions.map((option, optionIdx) => (
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

function CuStructureTip() {
	return (
		<HelpPopover>
			<p>The type of copper structure for your PCB.</p>
		</HelpPopover>
	);
}
