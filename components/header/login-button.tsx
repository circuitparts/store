"use client";
import { AuthContext } from "@/context/auth-context";
import { LOGIN_PAGE } from "@/lib/constants/page-routes";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useContext } from "react";

export function LoginButton() {
	const { isSignedIn } = useContext(AuthContext);
	return (
		<div hidden={isSignedIn}>
			<div className="hidden md:inline-block">
				<Button
					asChild
					size={"sm"}
					variant={"default"}>
					<Link href={LOGIN_PAGE}>Login</Link>
				</Button>
			</div>
		</div>
	);
}
