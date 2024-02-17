import { Icons } from "@/components/ui/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function HelpPopover(props: { children: React.ReactNode }) {
	return (
		<Popover>
			<PopoverTrigger className="text-gray-400">
				<Icons.GiHelp />
			</PopoverTrigger>
			<PopoverContent className="text-sm">{props.children}</PopoverContent>
		</Popover>
	);
}
