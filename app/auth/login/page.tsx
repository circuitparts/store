import { LoginForm } from "@/components/auth/login-form";
import { RESET_PASSWORD_PAGE, SIGNUP_PAGE } from "@/lib/constants/page-routes";
import { PLATFORM_NAME } from "@/lib/constants/app";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: `Login | ${PLATFORM_NAME}`,
	description: "Login to your Circuit Parts Account",
};

export default function Login() {
	return (
		<div className="my-10 justify-center sm:mb-48">
			<Card className="w-full sm:w-96 sm:mx-auto">
				<CardHeader className="space-y-1 text-center">
					<CardTitle className="text-2xl">Welcome Back!</CardTitle>
					<CardDescription>Please enter your login credentials</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<LoginForm />
				</CardContent>
				<CardFooter className="justify-between">
					<div className="text-sm text-muted-foreground">
						<Link
							href={SIGNUP_PAGE}
							className="text-primary underline-offset-4 transition-colors hover:underline">
							Create an account
						</Link>
					</div>
					<div className="text-sm text-muted-foreground">
						<Link
							href={RESET_PASSWORD_PAGE}
							className="text-primary underline-offset-4 transition-colors hover:underline">
							Reset password
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
