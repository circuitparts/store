"use client";
import { navigationOptions } from "@/components/header/navigation/navigation-options";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { PLATFORM_NAME } from "@/lib/constants/app";
import { HOME_PAGE } from "@/lib/constants/page-routes";
import logo from "@/public/images/logo.png";
import Image from "next/image";
import Link from "next/link";

export function TopNavbar() {
	return (
		<div className="hidden gap-6 xl:flex">
			<Link
				aria-label="Home"
				href={HOME_PAGE}
				className="hidden items-center space-x-2 lg:flex">
				<Image
					src={logo}
					alt="Logo"
					height={20}
					width={20}
				/>
				<span className="hidden text-xl font-bold lg:inline-block">{PLATFORM_NAME}</span>
			</Link>
			<NavigationMenu>
				<NavigationMenuList>
					{navigationOptions.map(option => (
						<NavigationMenuItem key={option.id}>
							<Link
								href={option.href}
								legacyBehavior
								passHref>
								<NavigationMenuLink
									data-testid={option.testid}
									className={navigationMenuTriggerStyle()}
									target={option.target ?? "_self"}>
									{option.name}
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
					))}
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
}
