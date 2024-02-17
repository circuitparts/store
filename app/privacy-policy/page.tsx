import { privacyPolicyContent } from "@/content/privacy-policy-content";
import { PLATFORM_NAME } from "@/lib/constants/app";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: `Privacy Policy | ${PLATFORM_NAME}`,
	description: `Learn about how ${PLATFORM_NAME} collect, use and protect your personal data.`,
};

export default function PrivacyPolicy() {
	return (
		<div className="px-4 sm:px-32">
			<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Privacy Policy</h1>
			<div className="space-y-2 mt-10">
				<p className="text-muted-foreground">Learn about how we collect, use and protect your personal data</p>
				<p className="text-muted-foreground">This policy was last modified on November 2023</p>
			</div>
			<div className="space-y-8 mt-10 text-justify">
				{privacyPolicyContent.map(condition => (
					<div key={condition.id}>
						<p className="font-semibold">{condition.heading}</p>
						<p>{condition.body}</p>
					</div>
				))}
			</div>
		</div>
	);
}
