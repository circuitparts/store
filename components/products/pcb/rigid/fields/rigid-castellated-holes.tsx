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
	selectCastellatedHoles,
	selectCastellatedHolesOptions,
	setCastellatedHoles,
} from "@/lib/redux/reducers/rigid-pcb-slice";
import { useDispatch } from "@/lib/redux/store";
import type { RigidPcbCastellatedHolesType } from "@/types/rigid-pcb-types";
import { useSelector } from "react-redux";

export function RigidCastellatedHoles() {
	const dispatch = useDispatch();
	const castellatedHoleOptions = useSelector(selectCastellatedHolesOptions);
	const castellatedHoles = useSelector(selectCastellatedHoles);

	function handleOnChange(value: RigidPcbCastellatedHolesType) {
		dispatch(setCastellatedHoles(value));
	}

	return (
		<div>
			<Dropdown
				value={castellatedHoles}
				onChange={handleOnChange}>
				<DropdownLabel>
					Castellated Holes <CastellatedHolesTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{castellatedHoles}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{castellatedHoleOptions.map((option, optionIdx) => (
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

function CastellatedHolesTip() {
	return (
		<HelpPopover>
			Castellations are plated through holes located in the edges of a printed circuit board and cut through to
			form a series of half holes.
			<ul className="my-1 list-disc space-y-2 px-3">
				<li>Hole diameter ≥ 0.6 mm</li>
				<li>Hole to board edge ≥ 1 mm</li>
				<li>Min. board size 10 x 10 mm</li>
				<li>Not available for small-batch single PCB orders, PCB panel is recommended.</li>
			</ul>
		</HelpPopover>
	);
}
