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
import { selectCopperType, selectCopperTypeOptions, setCopperType } from "@/lib/redux/reducers/flex-pcb-slice";
import type { FlexPcbCopperType } from "@/types/flex-pcb-types";
import { useDispatch, useSelector } from "react-redux";

export function FlexCopperType() {
	const dispatch = useDispatch();
	const copperTypeOptions = useSelector(selectCopperTypeOptions);
	const copperType = useSelector(selectCopperType);

	function handleOnChange(value: FlexPcbCopperType) {
		dispatch(setCopperType(value));
	}

	return (
		<div>
			<Dropdown
				value={copperType}
				onChange={handleOnChange}>
				<DropdownLabel>
					Copper Type <CopperTypeTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{copperType}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{copperTypeOptions.map((option, optionIdx) => (
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

function CopperTypeTip() {
	return (
		<HelpPopover>
			<p>
				Electro-Deposited (ED) copper is brittle. ED copper can be deposited in thinner layers , which can be
				beneficial in applications where thinner traces are required, and electrodeposited copper is less
				expensive.
			</p>
		</HelpPopover>
	);
}
