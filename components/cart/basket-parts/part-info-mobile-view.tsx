"use client";
import { AvailabilityStatus } from "@/components/cart/basket-parts/part-availability-status";
import { UpdatePartQuantityForm } from "@/components/cart/update-part-qty-form";
import { CurrencyContext } from "@/context/currency-context";
import { calculatePartNetPrice, calculatePartUnitPrice, convertAndFormatCurrency } from "@/lib/utils";
import type { PartDataType } from "@/types/part-types";
import { useContext } from "react";

export function PartInformationMobileView(props: { parts: PartDataType[]; part: PartDataType }) {
	const { parts, part } = props;
	const { Name, Availability } = part;
	const { currency } = useContext(CurrencyContext);
	const unitPrice = calculatePartUnitPrice(parts, Name);
	const unitPriceFormatted = convertAndFormatCurrency(unitPrice, currency);
	const netPrice = calculatePartNetPrice(part);
	const netPriceFormatted = convertAndFormatCurrency(netPrice, currency);

	return (
		<div className="lg:hidden">
			<div className="mt-1">
				<UpdatePartQuantityForm part={part} />
			</div>
			<div className="mt-1 grid grid-cols-2">
				<p className="text-muted-foreground">Availability:</p>
				<p>{Availability}</p>
				<p className="text-muted-foreground">Status:</p>
				<AvailabilityStatus Availability={Availability} />
			</div>
			<div className="mt-1 lg:hidden grid grid-cols-2">
				<p className="text-muted-foreground">Unit Price:</p>
				<p>{unitPriceFormatted}</p>
			</div>
			<div className="mt-1 lg:hidden grid grid-cols-2">
				<p className="text-muted-foreground">Net Price:</p>
				<p>{netPriceFormatted}</p>
			</div>
		</div>
	);
}
