"use client";
import {
	ORDER_SUCCESS_PAGE,
	REVIEW_ORDER_PAGE,
	STRIPE_CHECKOUT_SESSION_API_ENDPOINT,
} from "@/lib/constants/page-routes";
import { captureOrderDetailsAction } from "@/lib/server-actions/checkout-actions";
import { handleApiRequestError } from "@/lib/utils";
import type { CurrencyType } from "@/types/currency-types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type Stripe from "stripe";

type FetchResponseType = {
	status: Stripe.Checkout.Session.Status | null;
	paymentIntent: Stripe.PaymentIntent | null;
};

export default function StripeReturn() {
	const searchParams = useSearchParams();
	const sessionId = searchParams.get("session_id");
	const [checkoutStatus, setCheckoutStatus] = useState<Stripe.Checkout.Session.Status | null>(null);
	const [paymentIntent, setPaymentIntent] = useState<Stripe.PaymentIntent | null>(null);
	const router = useRouter();

	useEffect(() => {
		fetch(STRIPE_CHECKOUT_SESSION_API_ENDPOINT + sessionId, {
			method: "GET",
		})
			.then(res => res.json())
			.then((data: FetchResponseType) => {
				setCheckoutStatus(data.status);
				setPaymentIntent(data.paymentIntent);
			})
			.catch(console.error);
	}, [sessionId]);

	useEffect(() => {
		if (checkoutStatus === "open") {
			router.push(REVIEW_ORDER_PAGE);
		}

		if (checkoutStatus === "complete") {
			captureOrderDetailsAction({
				paymentId: paymentIntent?.id ?? "", // default empty string
				currency: (paymentIntent?.currency as CurrencyType | undefined) ?? "usd", // default usd
			}).catch((error: unknown) => {
				throw handleApiRequestError(error, "PAYMENT GATEWAY FAULT");
			});
			router.push(ORDER_SUCCESS_PAGE);
		}
	}, [checkoutStatus, paymentIntent?.currency, paymentIntent?.id, router]);

	return <></>;
}
