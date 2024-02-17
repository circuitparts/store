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
	selectAssemblySideOptions,
	selectAssemblySides,
	setAssemblySides,
} from "@/lib/redux/reducers/pcb-assembly-slice";
import type { PcbAssemblySideType } from "@/types/pcb-assembly-types";
import { useDispatch, useSelector } from "react-redux";

export function AssemblySides() {
	const dispatch = useDispatch();
	const assemblySideOptions = useSelector(selectAssemblySideOptions);
	const assemblySides = useSelector(selectAssemblySides);

	function handleOnChange(value: PcbAssemblySideType) {
		dispatch(setAssemblySides(value));
	}

	return (
		<div className="w-full">
			<Dropdown
				value={assemblySides}
				onChange={handleOnChange}>
				<DropdownLabel>
					Assembly Sides <AssemblySidesTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{assemblySides}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{assemblySideOptions.map((option, optionIdx) => (
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

function AssemblySidesTip() {
	return (
		<HelpPopover>
			<p>The side on which you&apos;d want us to place the components</p>
		</HelpPopover>
	);
}
