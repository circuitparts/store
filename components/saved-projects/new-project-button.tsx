import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { NewProjectForm } from "@/components/saved-projects/new-project-form";

export default function CreateNewProjectButton() {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button size={"sm"}>Create New Project</Button>
			</PopoverTrigger>
			<PopoverContent className="space-y-2">
				<NewProjectForm />
			</PopoverContent>
		</Popover>
	);
}
