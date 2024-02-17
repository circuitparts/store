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
	selectConformalCoating,
	selectConformalCoatingOptions,
	setConformalCoating,
} from "@/lib/redux/reducers/pcb-assembly-slice";
import type { PcbAssemblyConformalCoatingType } from "@/types/pcb-assembly-types";
import { useDispatch, useSelector } from "react-redux";

export function AssemblyConformalCoating() {
	const dispatch = useDispatch();
	const conformalCoatingOptions = useSelector(selectConformalCoatingOptions);
	const conformalCoating = useSelector(selectConformalCoating);

	async function handleOnChange(value: PcbAssemblyConformalCoatingType) {
		dispatch(setConformalCoating(value));
	}

	return (
		<div>
			<Dropdown
				value={conformalCoating}
				onChange={handleOnChange}>
				<DropdownLabel>
					Conformal Coating
					<ConformalCoatTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{conformalCoating}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{conformalCoatingOptions.map((option, optionIdx) => (
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

function ConformalCoatTip() {
	return (
		<HelpPopover>
			<p>Should we add a conformal coating to your board?</p>
		</HelpPopover>
	);
}
