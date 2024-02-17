import { ChangePasswordForm } from "@/components/account/update-account-form";
import { UserInfo } from "@/components/account/user-info";
import { PLATFORM_NAME } from "@/lib/constants/app";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: `Account Settings | ${PLATFORM_NAME}`,
	description: "Manage your account settings",
};

export default function Account() {
	return (
		<Card className="w-full sm:w-2/6 sm:mx-auto sm:mb-10">
			<CardHeader>
				<CardTitle className="text-2xl">Account Settings</CardTitle>
				<CardDescription>
					<p>Manage your account settings</p>
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<UserInfo />
				<ChangePasswordForm />
			</CardContent>
		</Card>
	);
}
