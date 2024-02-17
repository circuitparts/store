import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitialsFromFullName } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";

export function UserAvatar() {
	const { isSignedIn, user } = useUser();
	let initials = "";

	if (isSignedIn && user.firstName && user.lastName) {
		initials = getInitialsFromFullName(user.firstName, user.lastName);
	}

	return (
		<Avatar>
			<AvatarFallback>{initials}</AvatarFallback>
		</Avatar>
	);
}
