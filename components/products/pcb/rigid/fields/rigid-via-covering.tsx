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
	selectBaseMaterial,
	selectViaCovering,
	selectViaCoveringOptions,
	setViaCovering,
} from "@/lib/redux/reducers/rigid-pcb-slice";
import { useDispatch } from "@/lib/redux/store";
import type { RigidPcbViaCoveringType } from "@/types/rigid-pcb-types";
import { useSelector } from "react-redux";

export function RigidViaCovering() {
	const dispatch = useDispatch();
	const viaCoveringOptions = useSelector(selectViaCoveringOptions);
	const viaCovering = useSelector(selectViaCovering);
	const baseMaterial = useSelector(selectBaseMaterial);

	const hiddenOptions = ["Aluminum", "CopperCore"];

	function handleOnChange(value: RigidPcbViaCoveringType) {
		dispatch(setViaCovering(value));
	}

	return (
		<div hidden={hiddenOptions.includes(baseMaterial)}>
			<Dropdown
				value={viaCovering}
				onChange={handleOnChange}>
				<DropdownLabel>
					Via Covering <ViaCoveringTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{viaCovering}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{viaCoveringOptions.map((option, optionIdx) => (
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

function ViaCoveringTip() {
	return (
		<HelpPopover>
			The production is according to your Gerber files.
			<ul className="my-1 list-disc space-y-2 px-3">
				<li>
					<span className="font-semibold">Tented - </span> Vias are covered with soldermask and are not
					processed with HASL or ENIG. Boards with 6+ layers are upgraded to Epoxy Filled & Capped Via for
					free.
				</li>
				<li>
					<span className="font-semibold">Untented -</span>
					Soldermask is removed over the via and its annular ring. The via will be solderable and has the same
					surface finish as regular pads.
				</li>
				<li>
					<span className="font-semibold">Plugged -</span>
					The vias are partially closed with non-conductive media (epoxy/resin) and a layer of solder mask.
					Boards with 6+ layers are upgraded to Epoxy Filled & Capped Via.
				</li>
				<li>
					<span className="font-semibold">Epoxy filled & capped -</span>
					Vias should be at most 0.55 mm in diameter to avoid incomplete filling. Vias violating this size
					will be left unfilled. Vias are filled with epoxy resin and then plated over with copper to create a
					flat, solderable surface. Ideal for via-in-pad, multilayer boards, and thick boards.
				</li>
				<li>
					<span className="font-semibold">Copper paste filled & capped -</span>
					Vias should be at most 0.55 mm in diameter to avoid incomplete filling. Vias violating this size
					will be left unfilled. Vias are filled with high thermal conductivity copper paste and then plated
					over to create a flat, solderable surface. The filling has an excellent heat conductivity of 8 W/m·K
					ideal for via-in-pad and heatsink pads.
				</li>
			</ul>
		</HelpPopover>
	);
}
