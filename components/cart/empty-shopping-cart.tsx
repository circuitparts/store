import { Button } from "@/components/ui/button";
import { HOW_TO_GUIDES_PAGE, HOME_PAGE } from "@/lib/constants/page-routes";
import Link from "next/link";

export function EmptyShoppingCart() {
	return (
		<div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
			<div className="mx-auto max-w-2xl text-center">
				<h2 className="text-3xl font-bold sm:text-4xl">Your shopping cart is empty</h2>
				<p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
					Order some Components and Printed Circuit Boards to show them up here!
				</p>
				<div className="mt-6 flex items-center justify-center gap-x-6">
					<Button asChild>
						<Link href={HOME_PAGE}>Start Shopping</Link>
					</Button>
					<Link
						href={HOW_TO_GUIDES_PAGE}
						className="text-sm font-semibold text-gray-900">
						Help Center <span aria-hidden="true">&rarr;</span>
					</Link>
				</div>
			</div>
		</div>
	);
}
