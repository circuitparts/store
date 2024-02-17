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
	selectBaseMaterial,
	selectBreakDownVoltage,
	selectBreakDownVoltageOptions,
	setBreakdownVoltage,
} from "@/lib/redux/reducers/rigid-pcb-slice";
import { useDispatch } from "@/lib/redux/store";
import type { RigidPcbBreakDownVoltageType } from "@/types/rigid-pcb-types";
import { useSelector } from "react-redux";

export function RigidBreakdownVoltage() {
	const dispatch = useDispatch();
	const breakdownVoltageOptions = useSelector(selectBreakDownVoltageOptions);
	const breakdownVoltage = useSelector(selectBreakDownVoltage);
	const baseMaterial = useSelector(selectBaseMaterial);

	function handleOnChange(value: RigidPcbBreakDownVoltageType) {
		dispatch(setBreakdownVoltage(value));
	}

	return (
		<div hidden={baseMaterial !== "Aluminum"}>
			<Dropdown
				value={breakdownVoltage}
				onChange={handleOnChange}>
				<DropdownLabel>
					Breakdown Voltage (Volts) <BreakdownVoltageTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{breakdownVoltage}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{breakdownVoltageOptions.map((option, optionIdx) => (
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

function BreakdownVoltageTip() {
	return (
		<HelpPopover>
			<p>
				The minimum voltage that causes a portion of an insulator experiences electrical breakdown and becomes
				electrically conductive.
			</p>
		</HelpPopover>
	);
}
