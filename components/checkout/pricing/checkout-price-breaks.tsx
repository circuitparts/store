"use client";
import { CurrencyContext } from "@/context/currency-context";
import { calculateCartSubtotal, calculateSalesTax, convertAndFormatCurrency, getShippingCost } from "@/lib/utils";
import type { ShippingAddressType } from "@/types/address-types";
import type { CartDataType } from "@/types/cart-types";
import { useContext } from "react";

export function Subtotal(props: { cart: CartDataType | null }) {
	const { cart } = props;
	const { currency } = useContext(CurrencyContext);
	const cartValue = calculateCartSubtotal(cart);
	const subTotal = convertAndFormatCurrency(cartValue, currency);
	return <p className="font-medium text-end">{subTotal}</p>;
}

export function Shipping(props: { cart: CartDataType | null; shipAddress: ShippingAddressType }) {
	const { cart, shipAddress } = props;
	const { currency } = useContext(CurrencyContext);
	const shippingCountry = shipAddress.country;
	const { partShippingCost, pcbShippingCost } = getShippingCost(shippingCountry, cart);
	const partsShippingCostFormatted = convertAndFormatCurrency(partShippingCost, currency);
	const pcbShippingCostFormatted = convertAndFormatCurrency(pcbShippingCost, currency);

	return (
		<div className="text-end">
			<p className="mb-2"></p>
			<p className="font-medium my-1">{partsShippingCostFormatted}</p>
			<p className="font-medium my-1">{pcbShippingCostFormatted}</p>
		</div>
	);
}

export function SalesTax(props: { cart: CartDataType | null; shipAddress: ShippingAddressType }) {
	const { cart, shipAddress } = props;
	const { currency } = useContext(CurrencyContext);
	const cartValue = calculateCartSubtotal(cart);
	const shippingCountry = shipAddress.country;
	const { partShippingCost, pcbShippingCost } = getShippingCost(shippingCountry, cart);
	const totalOrderValue = cartValue + partShippingCost + pcbShippingCost;
	const tax = calculateSalesTax(totalOrderValue);
	const taxFormatted = convertAndFormatCurrency(tax, currency);
	return <p className="font-medium text-end">{taxFormatted}</p>;
}

export function OrderTotal(props: { cart: CartDataType | null; shipAddress: ShippingAddressType }) {
	const { cart, shipAddress } = props;
	const { currency } = useContext(CurrencyContext);
	const cartValue = calculateCartSubtotal(cart);
	const shippingCountry = shipAddress.country;
	const { partShippingCost, pcbShippingCost } = getShippingCost(shippingCountry, cart);
	const totalShipping = partShippingCost + pcbShippingCost;
	const tax = calculateSalesTax(cartValue + totalShipping);
	const totalOrderValue = cartValue + tax + totalShipping;
	const orderTotalWithShipping = convertAndFormatCurrency(totalOrderValue, currency);
	return <p className="text-base font-medium text-end">{orderTotalWithShipping}</p>;
}
