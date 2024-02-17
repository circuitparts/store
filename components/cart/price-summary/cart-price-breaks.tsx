"use client";
import { CurrencyContext } from "@/context/currency-context";
import { calculateCartSubtotal, calculateTotalPartsCost, calculateTotalPcbsCost, convertAndFormatCurrency } from "@/lib/utils";
import type { CartDataType } from "@/types/cart-types";
import { useContext } from "react";

export function CartComponentsTotal(props: { cart: CartDataType | null }) {
	const { cart } = props;
	const { currency } = useContext(CurrencyContext);
	const partsTotal = calculateTotalPartsCost(cart);
	const formattedTotal = convertAndFormatCurrency(partsTotal, currency);
	return <p className="font-medium">{formattedTotal}</p>;
}

export function CartPcbsTotal(props: { cart: CartDataType | null }) {
	const { cart } = props;
	const { currency } = useContext(CurrencyContext);
	const pcbsTotal = calculateTotalPcbsCost(cart);
	const formattedTotal = convertAndFormatCurrency(pcbsTotal, currency);
	return <p className="font-medium">{formattedTotal}</p>;
}

export function CartTotal(props: { cart: CartDataType | null }) {
	const { cart } = props;
	const { currency } = useContext(CurrencyContext);
	const cartTotal = calculateCartSubtotal(cart);
	const formattedCartTotal = convertAndFormatCurrency(cartTotal, currency);
	return <p className="text-base font-medium">{formattedCartTotal}</p>;
}
