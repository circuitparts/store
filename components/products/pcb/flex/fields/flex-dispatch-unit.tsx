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
import { selectDispatchUnit, selectDispatchUnitOptions, setDispatchUnit } from "@/lib/redux/reducers/flex-pcb-slice";
import type { FlexPcbDispatchUnitType } from "@/types/flex-pcb-types";
import { useDispatch, useSelector } from "react-redux";

export function FlexDispatchUnit() {
	const dispatch = useDispatch();
	const dispatchUnitOptions = useSelector(selectDispatchUnitOptions);
	const dispatchUnit = useSelector(selectDispatchUnit);

	function handleOnChange(value: FlexPcbDispatchUnitType) {
		dispatch(setDispatchUnit(value));
	}

	return (
		<div>
			<Dropdown
				value={dispatchUnit}
				onChange={handleOnChange}>
				<DropdownLabel>
					Dispatch Unit <DispatchUnitTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{dispatchUnit}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{dispatchUnitOptions.map((option, optionIdx) => (
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

function DispatchUnitTip() {
	return (
		<HelpPopover>
			<p>The delivery format in which you ask us to ship your PCBs after manufacturing.</p>
		</HelpPopover>
	);
}
