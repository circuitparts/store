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
import { selectCoverlay, selectCoverlayOptions, setCoverlay } from "@/lib/redux/reducers/flex-pcb-slice";
import type { FlexPcbCoverlayType } from "@/types/flex-pcb-types";
import { useDispatch, useSelector } from "react-redux";

export function FlexCoverlayColor() {
	const dispatch = useDispatch();
	const coverlayColorOptions = useSelector(selectCoverlayOptions);
	const coverlayColor = useSelector(selectCoverlay);

	function handleOnChange(value: FlexPcbCoverlayType) {
		dispatch(setCoverlay(value));
	}

	return (
		<div>
			<Dropdown
				value={coverlayColor}
				onChange={handleOnChange}>
				<DropdownLabel>
					Coverlay Color <CoverlayTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{coverlayColor}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{coverlayColorOptions.map((option, optionIdx) => (
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

function CoverlayTip() {
	return (
		<HelpPopover>
			<p>
				The flexible polyimide cover layer has the same function as soldermask on rigid PCBs: to prevent solder
				attachment and to provide insulation. <br />
				<span className="font-bold">Note:</span>Cover layer webs between pads require at least 0.5 mm pad
				spacing, otherwise the webs will be removed.
			</p>
		</HelpPopover>
	);
}
