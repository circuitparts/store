"use client";
import { CurrencyContext } from "@/context/currency-context";
import { convertAndFormatCurrency } from "@/lib/utils";
import type { PcbType } from "@/types/pcb-types";
import { useContext } from "react";

export function PcbUnitPrice(props: { pcb: PcbType }) {
	const { pcb } = props;
	const { currency } = useContext(CurrencyContext);
	const unitPriceFormatted = convertAndFormatCurrency(pcb.UnitPrice, currency);
	return <p>{unitPriceFormatted}</p>;
}

export function PcbNetPrice(props: { pcb: PcbType }) {
	const { pcb } = props;
	const { currency } = useContext(CurrencyContext);
	const netPriceFormatted = convertAndFormatCurrency(pcb.NetPrice, currency);
	return <p>{netPriceFormatted}</p>;
}

export function PcbUnitPriceMobileView(props: { pcb: PcbType }) {
	const { pcb } = props;
	const { NetPrice, OrderedQty } = pcb;
	const unitPrice = NetPrice / OrderedQty;
	const { currency } = useContext(CurrencyContext);
	const unitPriceFormatted = convertAndFormatCurrency(unitPrice, currency);
	return <p className="font-medium">{unitPriceFormatted}</p>;
}
