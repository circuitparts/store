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
import { selectSilkscreen, selectSilkscreenOptions, setSilkscreen } from "@/lib/redux/reducers/rigid-pcb-slice";
import { useDispatch } from "@/lib/redux/store";
import type { RigidPcbSilkscreenType } from "@/types/rigid-pcb-types";
import { useSelector } from "react-redux";

export function RigidSilkscreen() {
	const dispatch = useDispatch();
	const silkscreenOptions = useSelector(selectSilkscreenOptions);
	const silkscreen = useSelector(selectSilkscreen);

	function handleOnChange(value: RigidPcbSilkscreenType) {
		dispatch(setSilkscreen(value));
	}

	return (
		<div>
			<Dropdown
				value={silkscreen}
				onChange={handleOnChange}>
				<DropdownLabel>
					Silkscreen <SilkscreenTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{silkscreen}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{silkscreenOptions.map((option, optionIdx) => (
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

function SilkscreenTip() {
	return (
		<HelpPopover>
			<p>
				For most colors, the silkscreen is printed white. Only for white solder mask, the silkscreen is printed
				black. Please note, white printed silkscreen could be easily blend in with the gray surface. No
				silkscreen is recommended on the bare Aluminum surface.
			</p>
		</HelpPopover>
	);
}
