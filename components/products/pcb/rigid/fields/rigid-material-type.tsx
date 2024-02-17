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
	selectLayer,
	selectMaterial,
	selectMaterialOptions,
	setMaterial,
} from "@/lib/redux/reducers/rigid-pcb-slice";
import { useDispatch } from "@/lib/redux/store";
import type { RigidPcbMaterialType } from "@/types/rigid-pcb-types";
import { useSelector } from "react-redux";

export function RigidMaterialType() {
	const dispatch = useDispatch();
	const materialOptions = useSelector(selectMaterialOptions);
	const baseMaterial = useSelector(selectBaseMaterial);
	const material = useSelector(selectMaterial);
	const layer = useSelector(selectLayer);

	const isHidden = !(baseMaterial === "FR4" && layer >= 4) && baseMaterial !== "Rogers";

	function handleOnChange(value: RigidPcbMaterialType) {
		dispatch(setMaterial(value));
	}

	return (
		<div hidden={isHidden}>
			<Dropdown
				value={material}
				onChange={handleOnChange}>
				<DropdownLabel>
					Material Type <MaterialTypeTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{material}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{materialOptions.map((option, optionIdx) => (
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

function MaterialTypeTip() {
	return (
		<HelpPopover>
			The glass transition temperature(Tg) of base material.
			<ul className="my-1 list-disc space-y-2 px-3">
				<li>
					FR-4 is a common material for PCBs. Typically, we use FR4-Standard Tg 130-140 for PCB production.
				</li>
				<li>
					FR-4 Tg 155 has better flame retardance than standard FR-4, and it&apos;s appropriate for lead-free
					assembly. We recommend choosing TG155 for the following conditions.
					<ul className="ml-5 list-decimal space-y-1">
						<li>4&6 Layer PCB boards.</li>
						<li>PCBs use in automotive, military or aerospace applications.</li>
						<li>High-precision PCBs with 4mil trace width/spacing, 15mil hole to hole clearance, BGAs.</li>
					</ul>
				</li>
			</ul>
		</HelpPopover>
	);
}
