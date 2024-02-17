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
	selectChamferedGoldFingers,
	selectChamferedGoldFingersOptions,
	selectGoldFingers,
	setChamferedGoldFingers,
} from "@/lib/redux/reducers/rigid-pcb-slice";
import { useDispatch } from "@/lib/redux/store";
import type { RigidPcbChamferedGoldFingersType } from "@/types/rigid-pcb-types";
import { useSelector } from "react-redux";

export function RigidChamferedGoldFingers() {
	const dispatch = useDispatch();
	const chamferedGoldFingersOptions = useSelector(selectChamferedGoldFingersOptions);
	const chamferedGoldFinger = useSelector(selectChamferedGoldFingers);
	const goldFingers = useSelector(selectGoldFingers);

	function handleOnChange(value: RigidPcbChamferedGoldFingersType) {
		dispatch(setChamferedGoldFingers(value));
	}

	return (
		<div hidden={goldFingers === "No"}>
			<Dropdown
				value={chamferedGoldFinger}
				onChange={handleOnChange}>
				<DropdownLabel>
					Gold Finger Chamfered at 30° <ChamferedGoldFingersTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{chamferedGoldFinger}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{chamferedGoldFingersOptions.map((option, optionIdx) => (
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

function ChamferedGoldFingersTip() {
	return (
		<HelpPopover>
			<p>
				Gold fingers are the gold-plated columns along the connecting edges of PCBs. Only when ENIG surface
				finish is chosen, the fingers will be gold-plated. This the angle at which the edges will be chamfered.
			</p>
		</HelpPopover>
	);
}
