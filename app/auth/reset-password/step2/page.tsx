import { ResetPasswordForm2 } from "@/components/auth/reset-password-form-2";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Reset Password",
};

export default function ResetPasswordStep2() {
	return (
		<div className="mt-10 justify-center">
			<Card className="w-full sm:w-96 sm:mx-auto">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl">Reset your Password</CardTitle>
					<CardDescription>Enter the 6-digit code and your new password</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<ResetPasswordForm2 />
				</CardContent>
			</Card>
		</div>
	);
}
