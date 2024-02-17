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
import { selectSurfaceFinish, selectSurfaceFinishOptions, setSurfaceFinish } from "@/lib/redux/reducers/flex-pcb-slice";
import type { FlexPcbSurfaceFinishType } from "@/types/flex-pcb-types";
import { useDispatch, useSelector } from "react-redux";

export function FlexSurfaceFinish() {
	const dispatch = useDispatch();
	const surfaceFinishOptions = useSelector(selectSurfaceFinishOptions);
	const surfaceFinish = useSelector(selectSurfaceFinish);

	function handleOnChange(value: FlexPcbSurfaceFinishType) {
		dispatch(setSurfaceFinish(value));
	}

	return (
		<div>
			<Dropdown
				value={surfaceFinish}
				onChange={handleOnChange}>
				<DropdownLabel>
					Surface Finish <SurfaceFinishTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{surfaceFinish}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{surfaceFinishOptions.map((option, optionIdx) => (
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

function SurfaceFinishTip() {
	return (
		<HelpPopover>
			<p>
				ENIG has become the most popular surface finish in the industry as it offers flat surface, lead free and
				RoHS compliant, longer shelf life, and tighter tolerances can be held for plated holes.
			</p>
		</HelpPopover>
	);
}
