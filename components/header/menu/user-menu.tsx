"use client";
import { UserAvatar } from "@/components/header/avatar/user-avatar";
import { AuthContext } from "@/context/auth-context";
import { ACCOUNT_PAGE, ORDER_HISTORY_PAGE } from "@/lib/constants/page-routes";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useContext } from "react";

export function UserMenu() {
	const { isSignedIn } = useContext(AuthContext);
	const { signOut } = useAuth();

	return (
		<div hidden={!isSignedIn}>
			<div className="flex items-center">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant={"ghost"}
							size={"icon"}>
							<UserAvatar />
						</Button>
					</DropdownMenuTrigger>

					<DropdownMenuContent className="w-56">
						<DropdownMenuItem>
							<Link href={ACCOUNT_PAGE}>Account</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link href={ORDER_HISTORY_PAGE}>Order History</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}
