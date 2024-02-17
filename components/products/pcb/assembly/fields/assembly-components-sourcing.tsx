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
	selectComponentsProcurement,
	selectComponentsProcurementOptions,
	setComponentsProcurement,
} from "@/lib/redux/reducers/pcb-assembly-slice";
import type { PcbAssemblyComponentsProcurementType } from "@/types/pcb-assembly-types";
import { useDispatch, useSelector } from "react-redux";

export function AssemblyComponentSourcing() {
	const dispatch = useDispatch();
	const componentSourcingOptions = useSelector(selectComponentsProcurementOptions);
	const componentProcurement = useSelector(selectComponentsProcurement);

	function handleOnChange(value: PcbAssemblyComponentsProcurementType) {
		dispatch(setComponentsProcurement(value));
	}

	return (
		<div>
			<Dropdown
				value={componentProcurement}
				onChange={handleOnChange}>
				<DropdownLabel>
					Components Sourcing
					<ComponentSourcingTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{componentProcurement}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{componentSourcingOptions.map((option, optionIdx) => (
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

function ComponentSourcingTip() {
	return (
		<HelpPopover>
			<p>Should we source the components on your behalf?</p>
		</HelpPopover>
	);
}
