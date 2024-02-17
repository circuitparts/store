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
} from "@/lib/redux/reducers/flex-pcb-slice";
import type { FlexPcbGoldThicknessType } from "@/types/flex-pcb-types";
import { useDispatch, useSelector } from "react-redux";

export function FlexGoldThickness() {
	const dispatch = useDispatch();
	const goldThicknessOptions = useSelector(selectGoldThicknessOptions);
	const goldThickness = useSelector(selectGoldThickness);
	const surfaceFinish = useSelector(selectSurfaceFinish);

	function handleOnChange(value: FlexPcbGoldThicknessType) {
		dispatch(setGoldThickness(value));
	}

	return (
		<div hidden={!surfaceFinish}>
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
