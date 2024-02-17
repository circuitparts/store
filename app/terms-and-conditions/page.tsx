import { termsAndConditionContent } from "@/content/terms-and-conditions-content";
import { PLATFORM_NAME } from "@/lib/constants/app";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: `T&C | ${PLATFORM_NAME}`,
	description: `Terms and Conditions for the sale of products by ${PLATFORM_NAME} to ${PLATFORM_NAME}'s customers.`,
};

export default function TermsAndConditions() {
	return (
		<div className="px-4 sm:px-32">
			<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Terms and Conditions</h1>
			<div className="space-y-2 mt-10">
				<p className="font-semibold">Binding terms and conditions of sale</p>
				<p>
					The following are the terms and conditions of agreement (&quot;Terms and Conditions&quot;) for the
					sale of products (&quot;Products&quot;) by {PLATFORM_NAME} to {PLATFORM_NAME}&apos;s customers
					(&quot;Customers&quot;).
				</p>
			</div>
			<div className="space-y-8 mt-10 text-justify">
				{termsAndConditionContent.map(condition => (
					<div key={condition.id}>
						<p className="font-semibold">{condition.heading}</p>
						<p>{condition.body}</p>
					</div>
				))}
			</div>
		</div>
	);
}
