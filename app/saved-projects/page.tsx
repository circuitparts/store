import CreateNewProjectButton from "@/components/saved-projects/new-project-button";
import { NoSavedProjects } from "@/components/saved-projects/no-projects";
import ViewSavedProjects from "@/components/saved-projects/view-saved-projects";
import { fetchSavedProjects } from "@/lib/server-actions/helper-actions";

export default async function SavedProjects() {
	const savedProjects = await fetchSavedProjects();
	if (savedProjects instanceof Error) throw savedProjects;
	if (!savedProjects) return;

	return (
		<div className="mx-auto max-w-full px-4 sm:px-6">
			<div className="flex justify-between">
				<div className="space-y-2 mb-5">
					<h1 className="text-3xl font-bold tracking-tight">Saved Projects</h1>
					<p className="text-gray-600">Save products and quickly add them to your cart</p>
				</div>
				<CreateNewProjectButton />
			</div>
			{savedProjects.length ? <ViewSavedProjects savedProjects={savedProjects} /> : <NoSavedProjects />}
		</div>
	);
}
