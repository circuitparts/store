"use client";
import { CurrencyContext } from "@/context/currency-context";
import { env } from "@/env";
import { STRIPE_CHECKOUT_API_ENDPOINT } from "@/lib/constants/page-routes";
import { CONSOLE_RED_TEXT } from "@/lib/constants/app";
import type { StripeResponseType } from "@/types/stripe-response-type";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useContext, useEffect, useState } from "react";

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function StripeEmbeddedCheckout() {
	const [clientSecret, setClientSecret] = useState<string>("");
	const { currency } = useContext(CurrencyContext);

	useEffect(() => {
		fetch(STRIPE_CHECKOUT_API_ENDPOINT, {
			method: "POST",
			body: JSON.stringify({ currency }),
		})
			.then(res => res.json())
			.then((data: StripeResponseType) => setClientSecret(data.clientSecret))
			.catch(error => {
				console.log(CONSOLE_RED_TEXT, `STRIPE EMBEDDED CHECKOUT FAULT => ${error}`);
			});
	}, [currency]);

	return (
		<div id="checkout">
			{clientSecret && (
				<EmbeddedCheckoutProvider
					stripe={stripePromise}
					options={{ clientSecret }}>
					<EmbeddedCheckout />
				</EmbeddedCheckoutProvider>
			)}
		</div>
	);
}
