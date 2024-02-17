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
	selectImpedenceControl,
	selectImpedenceControlOptions,
	selectLayer,
	setImpedenceControl,
} from "@/lib/redux/reducers/rigid-pcb-slice";
import { useDispatch } from "@/lib/redux/store";
import type { RigidPcbImpedanceControlType } from "@/types/rigid-pcb-types";
import { useSelector } from "react-redux";

export function RigidImpedanceControl() {
	const dispatch = useDispatch();
	const impedenceControlOptions = useSelector(selectImpedenceControlOptions);
	const impedenceControl = useSelector(selectImpedenceControl);
	const layer = useSelector(selectLayer);

	function handleOnChange(value: RigidPcbImpedanceControlType) {
		dispatch(setImpedenceControl(value));
	}

	return (
		<div hidden={layer < 4}>
			<Dropdown
				value={impedenceControl}
				onChange={handleOnChange}>
				<DropdownLabel>
					Impedance Control <ImpedanceControlTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{impedenceControl}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{impedenceControlOptions.map((option, optionIdx) => (
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

function ImpedanceControlTip() {
	return (
		<HelpPopover>
			<p>
				We offer high precision Controlled Impedance PCB at extra charge, with a minimum trace width of 3.5mil,
				minimum via size of 0.2mm, and minimum BGA of 0.3mm.
			</p>
		</HelpPopover>
	);
}
