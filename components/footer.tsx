import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { PLATFORM_NAME, PLATFORM_ORIGIN_COUNTRY } from "@/lib/constants/app";
import {
	ABOUT_PAGE,
	CONTACT_US_PAGE,
	DISCORD_SERVER,
	DOCS_PAGE,
	GITHUB_REPO,
	HELP_CENTER_PAGE,
	PRIVACY_POLICY_PAGE,
	SHIPPING_AND_RETURNS_PAGE,
	TERMS_AND_CONDITIONS_PAGE
} from "@/lib/constants/page-routes";
import { getCurrentYear } from "@/lib/utils";
import Link from "next/link";

const footerOptions = [
	{ id: 1, name: "About", url: ABOUT_PAGE, target: "_blank"},
	{ id: 2, name: "Privacy Policy", url: PRIVACY_POLICY_PAGE, target: "_blank"},
	{ id: 3, name: "Terms & Conditions", url: TERMS_AND_CONDITIONS_PAGE, target: "_blank"},
	{ id: 4, name: "Shipping & Returns", url: SHIPPING_AND_RETURNS_PAGE, target: "_blank"},
	{ id: 5, name: "Help Center", url: HELP_CENTER_PAGE, target: "_blank" },
	{ id: 6, name: "Docs", url: DOCS_PAGE, target: "_blank" },
	{ id: 7, name: "Github", url: GITHUB_REPO, target: "_blank" },
	{ id: 8, name: "Discord", url: DISCORD_SERVER, target: "_blank" },
	{ id: 9, name: "Contact Us", url: CONTACT_US_PAGE },
];

export function Footer() {
	const currYear = getCurrentYear();
	return (
		<footer className="mx-auto max-w-7xl overflow-hidden border-t px-6 py-10 lg:px-8 mt-6">
			<nav className="mb-6 grid grid-cols-2 md:flex md:justify-center">
				{footerOptions.map(option => (
					<Button
						key={option.id}
						variant={"link"}
						className="justify-start"
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
