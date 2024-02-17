import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { currentUser } from "@clerk/nextjs";

export async function UserInfo() {
	const user = await currentUser();
	if (!user) return null;
	const email = user.emailAddresses[0]?.emailAddress;
	const fname = user.firstName;
	const lname = user.lastName;

	return (
		<Table>
			<TableBody>
				<TableRow className="border-b-0">
					<TableCell className="py-2 pr-4 font-semibold">Email</TableCell>
					<TableCell className="py-2 pl-4">{email}</TableCell>
				</TableRow>
				<TableRow className="border-b-0">
					<TableCell className="py-2 pr-4 font-semibold">First Name</TableCell>
					<TableCell className="py-2 pl-4">{fname}</TableCell>
				</TableRow>
				<TableRow className="border-b-0">
					<TableCell className="py-2 pr-4 font-semibold">Last Name</TableCell>
					<TableCell className="py-2 pl-4">{lname}</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
}
