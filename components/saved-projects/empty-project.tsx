import { NewProjectForm } from "@/components/saved-projects/new-project-form";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HOW_TO_GUIDES_PAGE } from "@/lib/constants/page-routes";
import Link from "next/link";

export function EmptyProject() {
	return (
		<div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
			<div className="mx-auto max-w-2xl text-center">
				<h2 className="text-3xl font-bold sm:text-4xl">You don&apos;t have any saved projects yet!</h2>
				<p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
					Create a new project and add some parts to show them up here!
				</p>
				<div className="mt-6 flex items-center justify-center gap-x-6">
					<Popover>
						<PopoverTrigger asChild>
							<Button>Create New Project</Button>
						</PopoverTrigger>
						<PopoverContent className="space-y-2">
							<NewProjectForm />
						</PopoverContent>
					</Popover>
					<Link
						href={HOW_TO_GUIDES_PAGE}
						className="text-sm font-semibold text-gray-900">
						Help Center <span aria-hidden="true">&rarr;</span>
					</Link>
				</div>
			</div>
		</div>
	);
}
