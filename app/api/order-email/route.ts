import { env } from "@/env";
import { OrderConfirmationEmailTemplate } from "@/components/email/order-confirmation-email-template";
import { CONSOLE_RED_TEXT, UPDATES_NOTIFICATION_EMAIL } from "@/lib/constants/app";
import type { OrderType } from "@/types/order-types";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);

export async function POST(request: Request) {
	const order = (await request.json()) as OrderType;
	try {
		const data = await resend.emails.send({
			from: UPDATES_NOTIFICATION_EMAIL,
			to: [order.billingAddress.email],
			subject: `Circuit Parts Order Confirmation: ${order.id}`,
			react: OrderConfirmationEmailTemplate(order),
		});
		return Response.json(data);
	} catch (error) {
		console.error(CONSOLE_RED_TEXT, `ORDER EMAIL FAULT => ${error as string}`);
		return Response.json({ error });
	}
}
