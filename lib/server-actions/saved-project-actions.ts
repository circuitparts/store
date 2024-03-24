"use server";
import { SAME_PROJECT_NAME_ERROR } from "@/lib/constants/error-messages";
import { mongoClient, usersCollection } from "@/lib/constants/mongo";
import { fetchSavedProjects } from "@/lib/server-actions/helper-actions";
import type { SavedProjectType } from "@/types/saved-project-types";
import { auth } from "@clerk/nextjs";

export async function createNewSavedProjectAction(name: string): Promise<void> {
	const { userId } = auth();
	const filter = { userId };
	try {
		const savedProjects = await fetchSavedProjects();
		if (savedProjects instanceof Error) throw savedProjects;

		if (savedProjects) {
			const existingProject = savedProjects.find(project => project.name === name);
			if (!existingProject) {
				const newProject: SavedProjectType = {
					name,
					createdAt: new Date(),
					updatedAt: new Date(),
					cartItems: [],
				};
				await mongoClient.connect();
				await usersCollection.updateOne(filter, { $push: { savedProjects: newProject } });
			} else {
				throw new Error(SAME_PROJECT_NAME_ERROR);
			}
		}
	} catch (error) {
		throw error; // handled on the client side.
	}
}
