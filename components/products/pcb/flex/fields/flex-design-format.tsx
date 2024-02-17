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
import { selectDesignFormat, selectDesignFormatOptions, setDesignFormat } from "@/lib/redux/reducers/flex-pcb-slice";
import type { FlexPcbDesignFormatType } from "@/types/flex-pcb-types";
import { useDispatch, useSelector } from "react-redux";

export function FlexDesignFormat() {
	const dispatch = useDispatch();
	const designFormatOptions = useSelector(selectDesignFormatOptions);
	const designFormat = useSelector(selectDesignFormat);

	function handleOnChange(value: FlexPcbDesignFormatType) {
		dispatch(setDesignFormat(value));
	}

	return (
		<div>
			<Dropdown
				value={designFormat}
				onChange={handleOnChange}>
				<DropdownLabel>
					Design Format <DesignFormatTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{designFormat}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{designFormatOptions.map((option, optionIdx) => (
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

function DesignFormatTip() {
	return (
		<HelpPopover>
			<p>This is the format of the design file supplied by you.</p>
			<ul className="list-disc px-3 space-y-2 my-1">
				<li>
					<span className="font-semibold">Single PCB - </span> The design file is a single PCB.
				</li>
				<li>
					<span className="font-semibold">Panel by Customer -</span>
					You construct the PCB panel yourself and provide us the panelized data for PCB production.
				</li>
				<li>
					<span className="font-semibold">Panel by Manufacturer -</span>
					We construct your panel with v-cut according to your need.
				</li>
			</ul>
			<p className="my-2">
				<span className="font-semibold">Note - </span>We only provide panelizing service:
				<ul className="list-disc px-3 space-y-2 my-1">
					<li>If PCBs are Regular shapes like rectangle and circle</li>
					<li>
						If number of different designs in a panel is more than one, then you need to panalize it
						yourself.
					</li>
				</ul>
			</p>
		</HelpPopover>
	);
}
