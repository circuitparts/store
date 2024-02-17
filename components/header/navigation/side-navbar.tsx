import { navigationOptions } from "@/components/header/navigation/navigation-options";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PLATFORM_NAME } from "@/lib/constants/app";
import { HOME_PAGE } from "@/lib/constants/page-routes";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/logo.png";

export function SideNavbar() {
	return (
		<Sheet>
			<SheetTrigger
				asChild
				className="xl:hidden">
				<Button
					variant="outline"
					size={"icon"}>
					<Icons.Bars3Icon className="h-4 w-4" />
				</Button>
			</SheetTrigger>
			<SheetContent
				side={"left"}
				className="flex w-64 grow flex-col gap-y-4 overflow-y-auto border-r px-6">
				<SheetHeader>
					<SheetTitle>
						<Link href={HOME_PAGE}>
							<div className="flex h-16 shrink-0 items-center space-x-2 border-b border-gray-300">
								<Image
									src={logo}
									alt="Logo"
									height={20}
									width={20}
								/>
								<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{PLATFORM_NAME}</h4>
							</div>
						</Link>
					</SheetTitle>
				</SheetHeader>
				{navigationOptions.map(option => (
					<Button
						key={option.id}
						asChild
						variant="link"
						className="flex justify-start gap-x-3 hover:bg-slate-950 hover:text-white hover:no-underline">
						<Link href={option.href}>
							<option.icon
								className="h-6 w-6 shrink-0"
								aria-hidden="true"
							/>
							{option.name}
						</Link>
					</Button>
				))}
			</SheetContent>
		</Sheet>
	);
}
