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
import { selectCuttingMethod, selectCuttingMethodOptions, setCuttingMethod } from "@/lib/redux/reducers/flex-pcb-slice";
import type { FlexPcbCuttingMethodType } from "@/types/flex-pcb-types";
import { useDispatch, useSelector } from "react-redux";

export function FlexCuttingMethod() {
	const dispatch = useDispatch();
	const cuttingMethodOptions = useSelector(selectCuttingMethodOptions);
	const cuttingMethod = useSelector(selectCuttingMethod);

	function handleOnChange(value: FlexPcbCuttingMethodType) {
		dispatch(setCuttingMethod(value));
	}

	return (
		<div>
			<Dropdown
				value={cuttingMethod}
				onChange={handleOnChange}>
				<DropdownLabel>
					Cutting Method <CuttingMethodTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{cuttingMethod}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{cuttingMethodOptions.map((option, optionIdx) => (
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

function CuttingMethodTip() {
	return (
		<HelpPopover>
			<p>
				Laser cutting is the default method. Carbonization at the cut edges can cause a slight shrink in the
				board&apos;s outline. To prevent this from removing support underneath gold fingers, all gold fingers
				are shortened by 0.2 mm in our DFM process..
			</p>
		</HelpPopover>
	);
}
