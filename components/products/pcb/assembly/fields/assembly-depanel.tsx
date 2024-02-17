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
import { selectDePanel, selectDePanelOptions, setDePanel } from "@/lib/redux/reducers/pcb-assembly-slice";
import type { PcbAssemblyDePanelType } from "@/types/pcb-assembly-types";
import { useDispatch, useSelector } from "react-redux";

export function AssemblyDepanel() {
	const dispatch = useDispatch();
	const depanelOptions = useSelector(selectDePanelOptions);
	const depanel = useSelector(selectDePanel);

	function handleOnChange(value: PcbAssemblyDePanelType) {
		dispatch(setDePanel(value));
	}

	return (
		<div>
			<Dropdown
				value={depanel}
				onChange={handleOnChange}>
				<DropdownLabel>
					De-panel <DepanelTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{depanel}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{depanelOptions.map((option, optionIdx) => (
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

function DepanelTip() {
	return (
		<HelpPopover>
			<p>Should we de-panel your board?</p>
		</HelpPopover>
	);
}
