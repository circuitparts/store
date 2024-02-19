"use client";
import { navigationOptions } from "@/components/header/navigation/navigation-options";
import { Icons } from "@/components/ui/icons";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { PLATFORM_NAME } from "@/lib/constants/app";
import { DOCS_PAGE, HOME_PAGE } from "@/lib/constants/page-routes";
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
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									{option.name}
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
					))}
					<NavigationMenuItem>
						<Link
							href={DOCS_PAGE}
							legacyBehavior
							passHref>
							<NavigationMenuLink target="_blank" className={navigationMenuTriggerStyle()}>
								Docs <Icons.MdArrowOutward className="h-4 w-4"/>
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	)
}
