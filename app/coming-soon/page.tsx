import { PLATFORM_NAME } from "@/lib/constants/app";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: `Coming Soon | ${PLATFORM_NAME}`,
	description: "Coming soon!",
};
export default function ComingSoon() {
	return (
		<main className="grid min-h-full place-items-center px-10 py-24 sm:py-32 lg:px-10">
			<div>
				<h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">Coming soon...</h1>
				<p className="mt-6 text-base leading-7 text-muted-foreground">
					Thanks for showing interest on our newest features. Our team is working round the clock get these
					features up and running. <br />
					We&apos;ll let you know once they are ready!
				</p>
			</div>
		</main>
	);
}
