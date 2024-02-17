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
	selectFunctionalTest,
	selectFunctionalTestOptions,
	setFunctionalTest,
} from "@/lib/redux/reducers/pcb-assembly-slice";
import type { PcbAssemblyFunctionalTestType } from "@/types/pcb-assembly-types";
import { useDispatch, useSelector } from "react-redux";

export function AssemblyFunctionalTest() {
	const dispatch = useDispatch();
	const functionalTestOptions = useSelector(selectFunctionalTestOptions);
	const functionalTest = useSelector(selectFunctionalTest);

	function handleOnChange(value: PcbAssemblyFunctionalTestType) {
		dispatch(setFunctionalTest(value));
	}

	return (
		<div>
			<Dropdown
				value={functionalTest}
				onChange={handleOnChange}>
				<DropdownLabel>
					Functional Test <FunctionalTestTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{functionalTest}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{functionalTestOptions.map((option, optionIdx) => (
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

function FunctionalTestTip() {
	return (
		<HelpPopover>
			<p>Do you want us to perform functional TemperatureAndHumiditySensitivity on your boards?</p>
		</HelpPopover>
	);
}
