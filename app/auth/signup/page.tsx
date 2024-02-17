import { SignupForm } from "@/components/auth/signup-form";
import { LOGIN_PAGE } from "@/lib/constants/page-routes";
import { PLATFORM_NAME } from "@/lib/constants/app";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: `Sign up | ${PLATFORM_NAME}`,
	description: `Sign up for a ${PLATFORM_NAME} account`,
};

export default function Signup() {
	return (
		<div className="mt-10 justify-center sm:mb-48">
			<Card className="w-full sm:w-96 sm:mx-auto">
				<CardHeader className="space-y-1 text-center">
					<CardTitle className="text-2xl">Create an account</CardTitle>
					<CardDescription>Signup for your circuit parts account</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<SignupForm />
				</CardContent>
				<CardFooter>
					<div className="text-sm text-muted-foreground">
						Already have an account?{" "}
						<Link
							aria-label="Sign in"
							href={LOGIN_PAGE}
							className="text-primary underline-offset-4 transition-colors hover:underline">
							Sign in
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
