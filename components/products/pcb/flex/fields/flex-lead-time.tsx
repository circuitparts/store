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
import { selectLeadTime, selectLeadTimeOptions, setLeadTime } from "@/lib/redux/reducers/flex-pcb-slice";
import type { FlexPcbLeadTimeType } from "@/types/flex-pcb-types";
import { useDispatch, useSelector } from "react-redux";

export function FlexLeadTime() {
	const dispatch = useDispatch();
	const leadTimeOptions = useSelector(selectLeadTimeOptions);
	const leadTime = useSelector(selectLeadTime);

	function handleOnChange(value: FlexPcbLeadTimeType) {
		dispatch(setLeadTime(value));
	}

	return (
		<div>
			<Dropdown
				value={leadTime}
				onChange={handleOnChange}>
				<DropdownLabel>
					Lead Time <LeadTimeTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{leadTime}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{leadTimeOptions.map((option, optionIdx) => (
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

function LeadTimeTip() {
	return (
		<HelpPopover>
			<p>
				The tentative time from start of physical production to production finished (ready for delivery),
				provided there are no errors in your design files.
			</p>
		</HelpPopover>
	);
}
