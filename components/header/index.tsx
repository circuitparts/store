import { ActionBar } from "@/components/header/navigation/action-bar";
import { SideNavbar } from "@/components/header/navigation/side-navbar";
import { TopNavbar } from "@/components/header/navigation/top-navbar";


export function Header() {
	return (
		<header className="bg-background sticky top-0 z-50 mx-auto w-full px-4 sm:px-6 lg:px-8">
			<div className="flex h-16 items-center">
				<TopNavbar />
				<SideNavbar />
				<ActionBar />
			</div>
		</header>
	);
}
