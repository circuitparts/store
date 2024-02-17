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
	selectEmiShieldingFilm,
	selectEmiShieldingFilmOptions,
	setEmiShieldingFilm,
} from "@/lib/redux/reducers/flex-pcb-slice";
import type { FlexPcbEMIShieldingFilmType } from "@/types/flex-pcb-types";
import { useDispatch, useSelector } from "react-redux";

export function FlexEMIShieldingFilm() {
	const dispatch = useDispatch();
	const emiShieldingOptions = useSelector(selectEmiShieldingFilmOptions);
	const emiShielding = useSelector(selectEmiShieldingFilm);

	function handleOnChange(value: FlexPcbEMIShieldingFilmType) {
		dispatch(setEmiShieldingFilm(value));
	}

	return (
		<div>
			<Dropdown
				value={emiShielding}
				onChange={handleOnChange}>
				<DropdownLabel>
					EMI Shielding Film <EmiShieldingTip />
				</DropdownLabel>
				<DropdownContainer>
					<DropdownTrigger>{emiShielding}</DropdownTrigger>
					<DropdownContent>
						<DropdownOptions>
							{emiShieldingOptions.map((option, optionIdx) => (
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

function EmiShieldingTip() {
	return (
		<HelpPopover>
			<p>
				Flex circuit boards can be susceptible to electromagnetic interference (EMI) due to their compact size
				and lack of shielding, EMI shield film helps reduce electromagnetic interference in order to resolve EMI
				issues. The film can be applied to both sides of the FPC or one side only (please state which side in
				design files).
			</p>
		</HelpPopover>
	);
}
