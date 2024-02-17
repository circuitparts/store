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
	selectGoldThickness,
	selectGoldThicknessOptions,
	selectSurfaceFinish,
	setGoldThickness,
} from "@/lib/redux/reducers/rigid-pcb-slice";
import { useDispatch } from "@/lib/redux/store";
import type { RigidPcbGoldThicknessType } from "@/types/rigid-pcb-types";
import { useSelector } from "react-redux";

export function RigidGoldThickness() {
	const dispatch = useDispatch();
	const goldThicknessOptions = useSelector(selectGoldThicknessOptions);
	const goldThickness = useSelector(selectGoldThickness);
	const surfaceFinish = useSelector(selectSurfaceFinish);

	function handleOnChange(value: RigidPcbGoldThicknessType) {
		dispatch(setGoldThickness(value));
	}

	return (
		<div hidden={surfaceFinish !== "ENIG"}>
			<Dropdown
				value={goldThickness}
				onChange={handleOnChange}>
				<DropdownLabel>
					Gold Thickness <GoldThicknessTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{goldThickness}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{goldThicknessOptions.map((option, optionIdx) => (
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

function GoldThicknessTip() {
	return (
		<HelpPopover>
			<p>The thickness of the gold layer for ENIG surface finish.</p>
		</HelpPopover>
	);
}
