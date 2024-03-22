"use client";
import { UserAvatar } from "@/components/header/avatar/user-avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "@/context/auth-context";
import { ACCOUNT_PAGE, ORDER_HISTORY_PAGE, SAVED_PROJECTS_PAGE } from "@/lib/constants/page-routes";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useContext } from "react";

const userMenuOptions = [
	{
		id: 1,
		name: "Account",
		url: ACCOUNT_PAGE,
	},
	{
		id: 2,
		name: "Saved Projects",
		url: SAVED_PROJECTS_PAGE,
	},
	{
		id: 3,
		name: "Order History",
		url: ORDER_HISTORY_PAGE,
	},
];

export function UserMenu() {
	const { isSignedIn } = useContext(AuthContext);
	const { signOut } = useAuth();

	return (
		<div hidden={!isSignedIn}>
			<div className="flex items-center">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							data-testid="user-menu-trigger-button"
							variant={"ghost"}
							size={"icon"}>
							<UserAvatar />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56">
						{userMenuOptions.map(option => {
							return (
								<DropdownMenuItem key={option.id}>
									<Link href={option.url}>{option.name}</Link>
								</DropdownMenuItem>
							);
						})}
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => signOut()}
							data-testid="logout-button">
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}
