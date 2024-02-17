import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Icons } from "@/components/ui/icons";

export function GuestAvatar() {
	return (
		<Avatar>
			<AvatarFallback>
				<Icons.guest />
			</AvatarFallback>
		</Avatar>
	);
}
