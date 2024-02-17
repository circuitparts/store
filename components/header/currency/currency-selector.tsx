"use client";
import { Flag } from "@/components/header/currency/flag";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/ui/icons";
import { CurrencyContext } from "@/context/currency-context";
import {
	AUD_CURR_CODE,
	CURRENCY_CODES,
	EUR_CURR_CODE,
	GBP_CURR_CODE,
	INR_CURR_CODE,
	USD_CURR_CODE,
} from "@/lib/constants/app";
import type { CurrencyType } from "@/types/currency-types";
import AustraliaFlag from "@/public/images/flags/australia.png";
import EuropeanUnionFlag from "@/public/images/flags/european-union.png";
import IndiaFlag from "@/public/images/flags/india.png";
import UnitedKingdomFlag from "@/public/images/flags/united-kingdom.png";
import UnitedStatesFlag from "@/public/images/flags/united-states.png";
import { useContext } from "react";

const currenyFlagMapping = {
	[INR_CURR_CODE]: { id: 1, flag: IndiaFlag, country: "India" },
	[USD_CURR_CODE]: { id: 2, flag: UnitedStatesFlag, country: "United States" },
	[EUR_CURR_CODE]: { id: 3, flag: EuropeanUnionFlag, country: "European Union" },
	[GBP_CURR_CODE]: { id: 4, flag: UnitedKingdomFlag, country: "United Kingdom" },
	[AUD_CURR_CODE]: { id: 5, flag: AustraliaFlag, country: "Australia" },
};

export function CurrencySelector() {
	const { setCurrency, currency } = useContext(CurrencyContext);
	const { flag, country } = currenyFlagMapping[currency]; // Get the flag for the selected currency

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className="text-xs flex"
				asChild>
				<Button
					variant={"ghost"}
					size={"sm"}
					className="gap-x-1">
					{currency.toUpperCase()}
					<Flag
						flag={flag}
						country={country}
					/>
					<Icons.IoIosArrowDown />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuRadioGroup
					value={currency}
					onValueChange={value => setCurrency(value as CurrencyType)}>
					{CURRENCY_CODES.map(currency => {
						const { flag, country } = currenyFlagMapping[currency as keyof typeof currenyFlagMapping];
						return (
							<DropdownMenuRadioItem
								key={currency}
								value={currency}
								className="flex justify-between">
								{currency.toUpperCase()}{" "}
								<Flag
									flag={flag}
									country={country}
								/>
							</DropdownMenuRadioItem>
						);
					})}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
