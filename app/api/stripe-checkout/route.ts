import { env } from "@/env";
import { CONSOLE_RED_TEXT, STATUS_BAD_REQUEST, STATUS_INTERNAL_SERVER_ERROR, STATUS_OK } from "@/lib/constants/app";
import { mongoClient, usersCollection } from "@/lib/constants/mongo";
import {
	calculateCartSubtotal,
	calculateSalesTax,
	calculateTotalPartsCost,
	calculateTotalPcbsCost,
	convertToStripeOrderAmount,
	getShippingCost,
} from "@/lib/utils";
import type { CurrencyType } from "@/types/currency-types";
import type { UserType } from "@/types/user-types";
import { auth } from "@clerk/nextjs";
import Stripe from "stripe";

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export async function POST(request: Request) {
	const { currency } = (await request.json()) as { currency: CurrencyType | null };
	if (!currency) return new Response(null, { status: STATUS_BAD_REQUEST, statusText: "No currency provided" });

	// format currency
	const formattedCurrency = currency.toLowerCase();

	try {
		// Fetch data
		await mongoClient.connect();
		const { userId } = auth();
		const userFilter = { userId };
		const userData = await usersCollection.findOne<UserType>(userFilter);
		if (!userData) {
			throw new Error("User not found");
		}

		const cart = userData.cart;
		const cartValue = calculateCartSubtotal(cart);
		const partsTotal = calculateTotalPartsCost(cart);
		const pcbsTotal = calculateTotalPcbsCost(cart);
		const shippingAddress = userData.shippingAddresses[0];
		const shippingCountry = shippingAddress.country;

		const { pcbShippingCost, partShippingCost } = getShippingCost(shippingCountry, cart);
		const totalShippingCost = partShippingCost + pcbShippingCost;

		const tax = calculateSalesTax(cartValue + totalShippingCost);

		const billingAddress = userData.billingAddresses[0];

		// create stripe customer to prefill data in checkout.
		const customer = await stripe.customers.create({
			email: billingAddress.email,
			name: billingAddress.firstName + " " + billingAddress.lastName,
			address: {
				line1: billingAddress.address1,
				line2: billingAddress.address2,
				city: billingAddress.city,
				state: billingAddress.state,
				postal_code: billingAddress.postalCode,
				country: billingAddress.country,
			},
		});

		// Create Stripe checkout session
		const session = await stripe.checkout.sessions.create({
			ui_mode: "embedded",
			customer: customer.id,
			line_items: [
				{
					quantity: 1,
					price_data: {
						currency: formattedCurrency,
						product_data: {
							name: "Components",
						},
						unit_amount: convertToStripeOrderAmount(partsTotal, currency), // Stripe expects price in cents
					},
				},
				{
					quantity: 1,
					price_data: {
						currency: formattedCurrency,
						product_data: {
							name: "Printed Circuit Boards",
						},
						unit_amount: convertToStripeOrderAmount(pcbsTotal, currency), // Stripe expects price in cents
					},
				},
				{
					quantity: 1,
					price_data: {
						currency: formattedCurrency,
						product_data: {
							name: "Shipping",
						},
						unit_amount: convertToStripeOrderAmount(totalShippingCost, currency), // Stripe expects price in cents
					},
				},
				{
					quantity: 1,
					price_data: {
						currency: formattedCurrency,
						product_data: {
							name: "Sales Tax",
						},
						unit_amount: convertToStripeOrderAmount(tax, currency), // Stripe expects price in cents
					},
				},
			],
			mode: "payment",
			return_url: `${env.NEXT_PUBLIC_APP_URL}/order-status/return?session_id={CHECKOUT_SESSION_ID}`,
		});
		return new Response(JSON.stringify({ clientSecret: session.client_secret ?? "" }), { status: STATUS_OK });
	} catch (error) {
		console.error(CONSOLE_RED_TEXT, `STRIPE CREATE CHECKOUT SESSION FAULT => ${error as string}`);
		return new Response(null, {
			status: STATUS_INTERNAL_SERVER_ERROR,
			statusText: `STRIPE CREATE CHECKOUT SESSION FAULT => ${error as string}`,
		});
	}
}

export async function GET(request: Request) {
	const url = new URL(request.url);
	const sessionId = url.searchParams.get("session_id");
	if (!sessionId) return new Response(null, { status: STATUS_BAD_REQUEST, statusText: "No session_id provided" });

	try {
		const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ["payment_intent"] });
		const paymentIntent = session.payment_intent;
		return new Response(JSON.stringify({ status: session.status, paymentIntent }), { status: STATUS_OK });
	} catch (error) {
		console.error(CONSOLE_RED_TEXT, `STRIPE GET CHECKOUT FAULT => ${error as string}`);
		return new Response(null, {
			status: STATUS_INTERNAL_SERVER_ERROR,
			statusText: "Stripe Checkout Failed.",
		});
	}
}
