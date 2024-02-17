"use client";
import { navigationOptions } from "@/components/header/navigation/navigation-options";
import { HOME_PAGE } from "@/lib/constants/page-routes";
import { PLATFORM_NAME } from "@/lib/constants/app";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/logo.png";

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
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
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
