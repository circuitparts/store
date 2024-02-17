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
import { selectSilkscreen, selectSilkscreenOptions, setSilkscreen } from "@/lib/redux/reducers/flex-pcb-slice";
import type { FlexPcbSilkscreenType } from "@/types/flex-pcb-types";
import { useDispatch, useSelector } from "react-redux";

export function FlexSilkscreen() {
	const dispatch = useDispatch();
	const silkscreenOptions = useSelector(selectSilkscreenOptions);
	const silkscreen = useSelector(selectSilkscreen);

	function handleOnChange(value: FlexPcbSilkscreenType) {
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
				The color of the silkscreen layer. This should be a different color from the cover layer to ensure
				readability.
			</p>
		</HelpPopover>
	);
}
