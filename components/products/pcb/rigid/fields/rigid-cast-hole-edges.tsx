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
	selectCastellatedHolesEdges,
	selectCastellatedHolesEdgesOptions,
	setCastellatedHolesEdges,
} from "@/lib/redux/reducers/rigid-pcb-slice";
import { useDispatch } from "@/lib/redux/store";
import type { RigidPcbCastellatedHolesEdgesType } from "@/types/rigid-pcb-types";
import { useSelector } from "react-redux";

export function RigidCastellatedHolesEdges() {
	const dispatch = useDispatch();
	const castellatedHolesEdgesOptions = useSelector(selectCastellatedHolesEdgesOptions);
	const castellatedHolesEdges = useSelector(selectCastellatedHolesEdges);
	const castellatedHoles = useSelector(selectCastellatedHoles);

	function handleOnChange(value: RigidPcbCastellatedHolesEdgesType) {
		dispatch(setCastellatedHolesEdges(value));
	}

	return (
		<div hidden={castellatedHoles === "No"}>
			<Dropdown
				value={castellatedHolesEdges}
				onChange={handleOnChange}>
				<DropdownLabel>
					Edges with Castellated Holes <CastellatedHoleEdgesTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{castellatedHolesEdges}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{castellatedHolesEdgesOptions.map((option, optionIdx) => (
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

function CastellatedHoleEdgesTip() {
	return (
		<HelpPopover>
			<p>The number of PCB-edges that has castellated holes.</p>
		</HelpPopover>
	);
}
