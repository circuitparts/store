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
	selectCoverlayThickness,
	selectCoverlayThicknessOptions,
	setCoverlayThickness,
} from "@/lib/redux/reducers/flex-pcb-slice";
import type { FlexPcbCoverlayThicknessType } from "@/types/flex-pcb-types";
import { useDispatch, useSelector } from "react-redux";

export function FlexCoverlayThickness() {
	const dispatch = useDispatch();
	const coverlayThicknessOptions = useSelector(selectCoverlayThicknessOptions);
	const coverlayThickness = useSelector(selectCoverlayThickness);

	function handleOnChange(value: FlexPcbCoverlayThicknessType) {
		dispatch(setCoverlayThickness(value));
	}

	return (
		<div>
			<Dropdown
				value={coverlayThickness}
				onChange={handleOnChange}>
				<DropdownLabel>
					Coverlay Thickness <CoverlayThicknessTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{coverlayThickness}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{coverlayThicknessOptions.map((option, optionIdx) => (
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

function CoverlayThicknessTip() {
	return (
		<HelpPopover>
			<p>
				For 1/3 oz and 0.5 oz copper, the cover layer is 12.5 μm and glue is 15 μm. For 1 oz copper, the cover
				layer is 25 μm and glue is 25 μm.
			</p>
		</HelpPopover>
	);
}
