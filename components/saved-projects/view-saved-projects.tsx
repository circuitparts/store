import { DeleteProjectButton } from "@/components/saved-projects/delete-project-button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { SAVED_PROJECTS_PAGE } from "@/lib/constants/page-routes";
import type { SavedProjectType } from "@/types/saved-project-types";
import Link from "next/link";
import { Suspense } from "react";

export default function ViewSavedProjects(props: { savedProjects: SavedProjectType[] }) {
	const { savedProjects } = props;
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>S.No.</TableHead>
					<TableHead>Project Name</TableHead>
					<TableHead>Date Created</TableHead>
					<TableHead>Products</TableHead>
					<TableHead>Delete</TableHead>
				</TableRow>
			</TableHeader>
			<Suspense fallback={<TableSkeleton />}>
				<TableBody>
					{savedProjects.map((project, projectIdx) => {
						return (
							<TableRow key={project.name}>
								<TableCell>{projectIdx + 1}</TableCell>
								<TableCell>
									<Link
										href={SAVED_PROJECTS_PAGE + "/" + project.name}
										className="underline">
										{project.name}
									</Link>
								</TableCell>
								<TableCell>{project.createdAt.toLocaleString()}</TableCell>
								<TableCell>{project.cartItems.length}</TableCell>
								<TableCell>
									<DeleteProjectButton />
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Suspense>
		</Table>
	);
}
