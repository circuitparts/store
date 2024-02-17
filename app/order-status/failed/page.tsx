import { CONTACT_US_PAGE, REVIEW_ORDER_PAGE } from "@/lib/constants/page-routes";
import { PLATFORM_NAME } from "@/lib/constants/app";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: `Order Failed | ${PLATFORM_NAME}`,
	description: "Looks like the order didn't go through.",
};
export default function OrderFailed() {
	return (
		<div>
			<div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						Looks like the order didn&apos;t go through 😔
					</h2>
					<p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
						But don&apos;t worry, your shopping cart is intack. Click the button below to return to your
						shopping and try again. We apologise for the inconvenience 😅
					</p>
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<Button asChild>
							<Link href={REVIEW_ORDER_PAGE}>Retry →</Link>
						</Button>
						<Link
							href={CONTACT_US_PAGE}
							className="text-sm font-semibold text-gray-900">
							Contact support <span aria-hidden="true">&rarr;</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
