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
import { selectLayer, selectLayerOptions, setLayer } from "@/lib/redux/reducers/rigid-pcb-slice";
import { useDispatch } from "@/lib/redux/store";
import type { RigidPcbLayerType } from "@/types/rigid-pcb-types";
import { useSelector } from "react-redux";

export function RigidLayer() {
	const dispatch = useDispatch();
	const layerOptions = useSelector(selectLayerOptions);
	const layer = useSelector(selectLayer);

	function handleOnChange(value: RigidPcbLayerType) {
		dispatch(setLayer(value));
	}

	return (
		<div className="w-full">
			<Dropdown
				value={layer}
				onChange={handleOnChange}>
				<DropdownLabel>
					Layer <LayerTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{layer}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{layerOptions.map((option, optionIdx) => (
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

function LayerTip() {
	return (
		<HelpPopover>
			<p>The number of copper layers in your board.</p>
		</HelpPopover>
	);
}
