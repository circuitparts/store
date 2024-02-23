import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { PLATFORM_NAME, PLATFORM_ORIGIN_COUNTRY } from "@/lib/constants/app";
import {
	ABOUT_PAGE,
	BLOG_PAGE,
	CONTACT_US_PAGE,
	DOCS_PAGE,
	GITHUB_REPO,
	HELP_PAGE,
	PRIVACY_POLICY_PAGE,
	SHIPPING_AND_RETURNS_PAGE,
	TERMS_AND_CONDITIONS_PAGE,
} from "@/lib/constants/page-routes";
import { getCurrentYear } from "@/lib/utils";
import Link from "next/link";

const footerOptions = [
	{ id: 1, name: "About", url: ABOUT_PAGE },
	{ id: 2, name: "Privacy Policy", url: PRIVACY_POLICY_PAGE },
	{ id: 3, name: "Terms & Conditions", url: TERMS_AND_CONDITIONS_PAGE },
	{ id: 4, name: "Shipping & Returns", url: SHIPPING_AND_RETURNS_PAGE },
	{ id: 5, name: "Contact Us", url: CONTACT_US_PAGE },
	{ id: 6, name: "Help", url: HELP_PAGE },
	{ id: 7, name: "Blog", url: BLOG_PAGE },
	{ id: 8, name: "Github", url: GITHUB_REPO, target: "_blank" },
	{ id: 9, name: "Docs", url: DOCS_PAGE, target: "_blank" },
];

export function Footer() {
	const currYear = getCurrentYear();
	return (
		<footer className="mx-auto max-w-7xl overflow-hidden border-t px-6 py-10 lg:px-8 mt-6">
			<nav className="mb-6 columns-2 sm:flex sm:justify-center">
				{footerOptions.map(option => (
					<Button
						key={option.id}
						variant={"link"}
						asChild>
						<Link
							target={option.target ?? "_self"}
							href={option.url}
							className="link-primary">
							{option.name}
						</Link>
					</Button>
				))}
			</nav>
			<p className="text-muted-foreground mt-5 text-center text-sm leading-5">
				&copy; {currYear} {PLATFORM_NAME}. All rights reserved.
			</p>
			<p className="mt-2 flex items-center justify-center text-sm leading-5">
				Made with <Icons.HeartFilledIcon className="mx-1" /> in {PLATFORM_ORIGIN_COUNTRY} | Proudly
				<span className="ml-1">
					<Link
						href={GITHUB_REPO}
						target="_blank">
						Open-source software.
					</Link>
				</span>
			</p>
		</footer>
	);
}
