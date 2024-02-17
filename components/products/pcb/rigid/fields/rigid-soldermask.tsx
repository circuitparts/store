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
import { selectSoldermask, selectSoldermaskOptions, setSoldermask } from "@/lib/redux/reducers/rigid-pcb-slice";
import { useDispatch } from "@/lib/redux/store";
import type { RigidPcbSoldermaskType } from "@/types/rigid-pcb-types";
import { useSelector } from "react-redux";

export function RigidSoldermask() {
	const dispatch = useDispatch();
	const soldermaskOptions = useSelector(selectSoldermaskOptions);
	const soldermask = useSelector(selectSoldermask);

	function handleOnChange(value: RigidPcbSoldermaskType) {
		dispatch(setSoldermask(value));
	}

	return (
		<div>
			<Dropdown
				value={soldermask}
				onChange={handleOnChange}>
				<DropdownLabel>
					PCB Color <SoldermaskTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{soldermask}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{soldermaskOptions.map((option, optionIdx) => (
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

function SoldermaskTip() {
	return (
		<HelpPopover>
			<p>
				The PCB solder mask color. The green standard has the best performance and fastest turnaround time. For
				most colors, the silkscreen is printed white. Only for white solder mask, the silkscreen is printed
				black.
			</p>
		</HelpPopover>
	);
}
