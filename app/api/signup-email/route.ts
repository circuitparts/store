import { SignupEmailTemplate } from "@/components/email/signup-email-template";
import { env } from "@/env";
import { UPDATES_NOTIFICATION_EMAIL } from "@/lib/constants/app";
import type { ClerkSignupDataType } from "@/types/clerk-types";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);

export async function POST(request: Request) {
	const user = (await request.json()) as ClerkSignupDataType;
	try {
		const data = await resend.emails.send({
			from: UPDATES_NOTIFICATION_EMAIL,
			to: [user.email],
			subject: "Signup Successfull!",
			react: SignupEmailTemplate(user.firstName),
		});
		return Response.json(data);
	} catch (error) {
		return Response.json({ error });
	}
}
