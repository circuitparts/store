import { EmptyProject } from "@/components/saved-projects/empty-project";

export default function SavedProjects() {
	return (
		<div className="mx-auto max-w-full px-4 sm:px-6">
			<div className="space-y-2">
				<h1 className="text-3xl font-bold tracking-tight">Saved Projects</h1>
				<p className="text-gray-600">Save products and quickly add them to your cart</p>
			</div>
			<EmptyProject />
		</div>
	);
}
