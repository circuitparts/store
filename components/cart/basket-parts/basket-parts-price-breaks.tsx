"use client";
import { CurrencyContext } from "@/context/currency-context";
import { calculatePartNetPrice, calculatePartUnitPrice, convertAndFormatCurrency } from "@/lib/utils";
import type { PartDataType } from "@/types/part-types";
import { useContext } from "react";

export function PartUnitPrice(props: { parts: PartDataType[]; Name: string }) {
	const { currency } = useContext(CurrencyContext);
	const { parts, Name } = props;
	const unitPrice = calculatePartUnitPrice(parts, Name);
	const unitPriceFormatted = convertAndFormatCurrency(unitPrice, currency);
	return <p>{unitPriceFormatted}</p>;
}

export function PartNetPrice(props: { part: PartDataType }) {
	const { currency } = useContext(CurrencyContext);
	const { part } = props;
	const netPrice = calculatePartNetPrice(part);
	const netPriceFormatted = convertAndFormatCurrency(netPrice, currency);
	return <p>{netPriceFormatted}</p>;
}
