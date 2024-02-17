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
import { selectBaseMaterial, selectBaseMaterialOptions, setBaseMaterial } from "@/lib/redux/reducers/rigid-pcb-slice";
import { useDispatch } from "@/lib/redux/store";
import type { RigidPcbBaseMaterialType } from "@/types/rigid-pcb-types";
import { useSelector } from "react-redux";

export function RigidBaseMaterial() {
	const dispatch = useDispatch();
	const baseMaterialOptions = useSelector(selectBaseMaterialOptions);
	const baseMaterial = useSelector(selectBaseMaterial);

	function handleOnChange(value: RigidPcbBaseMaterialType) {
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
			<ul className="my-1 list-disc space-y-2 px-3">
				<li>FR-4 is the most popular substrate material for rigid PCBs.</li>
				<li>
					Flex PCBs utilize a thin, flexible polymer film as the substrate for the circuitry. Flex PCBs reduce
					space consumption, and have lower weight.
				</li>
				<li>
					Aluminum/copper core boards have better heat dissipation and thermal transfer than standard FR-4
					constructions.
				</li>
				<li>
					Rogers PCBs have excellent dielectric properties and minimal resistance. They are generally used in
					high-speed, high-frequency circuitry applications.
				</li>
			</ul>
			<p className="my-2">
				<span className="font-semibold">Note - </span>For Aluminum/Copper core boards, the min drill size is
				1.0mm, and min slot width is 1.6mm.
			</p>
		</HelpPopover>
	);
}
