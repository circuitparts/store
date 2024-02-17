import { CONTACT_US_PAGE, HOME_PAGE } from "@/lib/constants/page-routes";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
	return (
		<main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
			<div className="text-center">
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Part not found</h1>
				<p className="mt-6 text-base leading-7 text-gray-600">
					Sorry, we couldn&apos;t find the part you&apos;re looking for. Please check your part numnber and
					try again.
				</p>
				<div className="mt-10 flex items-center justify-center gap-x-6">
					<Button asChild>
						<Link href={HOME_PAGE}>Return to Home</Link>
					</Button>
					<Link
						href={CONTACT_US_PAGE}
						className="text-sm font-semibold text-gray-900">
						Contact support <span aria-hidden="true">&rarr;</span>
					</Link>
				</div>
			</div>
		</main>
	);
}
