import { Button } from "@/components/ui/button";
import { CONTACT_US_PAGE, HOME_PAGE } from "@/lib/constants/page-routes";
import Link from "next/link";

export function EmptyShoppingCart() {
	return (
		<div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
			<div className="mx-auto max-w-2xl text-center">
				<h2 className="text-3xl font-bold sm:text-4xl">Your shopping cart is empty</h2>
				<p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
					Go ahead and order some Components and Printed Circuit Boards for your next project.
				</p>
				<div className="mt-10 flex items-center justify-center gap-x-6">
					<Button asChild>
						<Link href={HOME_PAGE}>Start Shopping</Link>
					</Button>
					<Link
						href={CONTACT_US_PAGE}
						className="text-sm font-semibold text-gray-900">
						Contact support <span aria-hidden="true">&rarr;</span>
					</Link>
				</div>
			</div>
		</div>
	);
}
