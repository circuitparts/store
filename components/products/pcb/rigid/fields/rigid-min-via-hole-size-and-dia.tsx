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
	selectLayer,
	selectMinViaHoleSizeAndDiameter,
	selectMinViaHoleSizeAndDiameterOptions,
	setMinViaHoleSizeAndDiameter,
} from "@/lib/redux/reducers/rigid-pcb-slice";
import { useDispatch } from "@/lib/redux/store";
import type { RigidPcbMinViaHoleSizeAndDiameterType } from "@/types/rigid-pcb-types";
import { useSelector } from "react-redux";

export function RigidMinimumHoleSizeAndDiameter() {
	const dispatch = useDispatch();
	const minHoleSizeAndDiameterOptions = useSelector(selectMinViaHoleSizeAndDiameterOptions);
	const minHoleSizeAndDiameter = useSelector(selectMinViaHoleSizeAndDiameter);
	const layer = useSelector(selectLayer);

	function handleOnChange(value: RigidPcbMinViaHoleSizeAndDiameterType) {
		dispatch(setMinViaHoleSizeAndDiameter(value));
	}

	return (
		<div hidden={layer < 4}>
			<Dropdown
				value={minHoleSizeAndDiameter}
				onChange={handleOnChange}>
				<DropdownLabel>
					Minimum Hole Size / Diameter <MinHoleSizeTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{minHoleSizeAndDiameter}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{minHoleSizeAndDiameterOptions.map((option, optionIdx) => (
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

function MinHoleSizeTip() {
	return (
		<HelpPopover>
			<p>
				The minimum via hole size and via diameter. Via diameter should be 0.1mm(0.15mm preferred) larger than
				Via hole size. e.g. when the via hole size is 0.2mm, the via diameter should be 0.3mm or 0.35mm.
			</p>
			<p>
				<span>Note: </span>Additional charges will apply when the via hole&lt;0.3mm and the via
				diameter≤0.4mm.No additional charge when the via hole&lt;0.3mm, and via diameter&gt;0.4mm. e.g.
				additional charge is needed for 0.2mm hole/0.4mm diameter, while 0.2mm hole/0.45mm diameter is free.
			</p>
		</HelpPopover>
	);
}
