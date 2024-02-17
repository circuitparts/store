"use client";
import { GuestAvatar } from "@/components/header/avatar/guest-avatar";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/auth-context";
import { LOGIN_PAGE, ORDER_HISTORY_PAGE, SIGNUP_PAGE } from "@/lib/constants/page-routes";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useContext } from "react";

const guestMenuOptions = [
	{
		id: 1,
		name: "Log In",
		href: LOGIN_PAGE,
	},
	{
		id: 2,
		name: "Sign Up",
		href: SIGNUP_PAGE,
	},
	{
		id: 3,
		name: "Order History",
		href: ORDER_HISTORY_PAGE,
	},
];

export function GuestMenu() {
	const { isSignedIn } = useContext(AuthContext);
	return (
		<div hidden={isSignedIn}>
			<div className="flex items-center">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							className="md:hidden"
							variant={"ghost"}
							size={"icon"}>
							<GuestAvatar />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56">
						{guestMenuOptions.map(option => (
							<DropdownMenuItem key={option.id}>
								<Link href={option.href}>{option.name}</Link>
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}
