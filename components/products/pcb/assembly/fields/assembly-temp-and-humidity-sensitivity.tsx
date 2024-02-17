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
	selectTempHumiditySensitivity,
	selectTempHumiditySensitivityOptions,
	setTempHumiditySensitivity,
} from "@/lib/redux/reducers/pcb-assembly-slice";
import type { PcbAssemblyTempHumiditySensitivityType } from "@/types/pcb-assembly-types";
import { useDispatch, useSelector } from "react-redux";

export function AssemblyTemperatureAndHumiditySensitivity() {
	const dispatch = useDispatch();
	const temperatureAndHumiditySensitivityOptions = useSelector(selectTempHumiditySensitivityOptions);
	const temperatureAndHumiditySensitity = useSelector(selectTempHumiditySensitivity);

	function handleOnChange(value: PcbAssemblyTempHumiditySensitivityType) {
		dispatch(setTempHumiditySensitivity(value));
	}

	return (
		<div>
			<Dropdown
				value={temperatureAndHumiditySensitity}
				onChange={handleOnChange}>
				<DropdownLabel>
					Temperature & Humidity Sensitivity
					<TempAndHumidityTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{temperatureAndHumiditySensitity}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{temperatureAndHumiditySensitivityOptions.map((option, optionIdx) => (
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

function TempAndHumidityTip() {
	return (
		<HelpPopover>
			<p>The temperature and humidity sensitivity tolerance of your components</p>
		</HelpPopover>
	);
}
