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
import { selectGoldFingers, selectGoldFingersOptions, setGoldFingers } from "@/lib/redux/reducers/rigid-pcb-slice";
import { useDispatch } from "@/lib/redux/store";
import type { RigidPcbGoldFingersType } from "@/types/rigid-pcb-types";
import { useSelector } from "react-redux";

export function RigidGoldFingers() {
	const dispatch = useDispatch();
	const goldFingersOptions = useSelector(selectGoldFingersOptions);
	const goldFingers = useSelector(selectGoldFingers);

	function handleOnChange(value: RigidPcbGoldFingersType) {
		dispatch(setGoldFingers(value));
	}

	return (
		<div>
			<Dropdown
				value={goldFingers}
				onChange={handleOnChange}>
				<DropdownLabel>
					Gold Fingers <GoldfingerTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{goldFingers}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{goldFingersOptions.map((option, optionIdx) => (
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

function GoldfingerTip() {
	return (
		<HelpPopover>
			<p>
				Gold fingers are the gold-plated columns along the connecting edges of PCBs. Only when ENIG surface
				finish is chosen, the fingers will be gold-plated. If you choose HASL surface finish, we will use HASL
				as edge connect plating.
			</p>
		</HelpPopover>
	);
}
