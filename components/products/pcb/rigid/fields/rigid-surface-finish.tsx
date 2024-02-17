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
	selectSurfaceFinish,
	selectSurfaceFinishOptions,
	setSurfaceFinish,
} from "@/lib/redux/reducers/rigid-pcb-slice";
import { useDispatch } from "@/lib/redux/store";
import type { RigidPcbSurfaceFinishType } from "@/types/rigid-pcb-types";
import { useSelector } from "react-redux";

export function RigidSurfaceFinish() {
	const dispatch = useDispatch();
	const surfaceFinishOptions = useSelector(selectSurfaceFinishOptions);
	const surfaceFinish = useSelector(selectSurfaceFinish);

	function handleOnChange(value: RigidPcbSurfaceFinishType) {
		dispatch(setSurfaceFinish(value));
	}

	return (
		<div>
			<Dropdown
				value={surfaceFinish}
				onChange={handleOnChange}>
				<DropdownLabel>
					Surface Finish <SurfaceFinishTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{surfaceFinish}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{surfaceFinishOptions.map((option, optionIdx) => (
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

function SurfaceFinishTip() {
	return (
		<HelpPopover>
			<p>
				HASL is an affordable finishing option that utilizes tin/lead to creating a thin protective covering on
				a PCB. ENIG has become the most popular surface finish in the industry as it offers flat surface, lead
				free and RoHS compliant, longer shelf life, and tighter tolerances can be held for plated holes.
			</p>
		</HelpPopover>
	);
}
