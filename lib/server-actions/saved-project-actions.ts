"use server";
import { SAME_PROJECT_NAME_ERROR } from "@/lib/constants/error-messages";
import { mongoClient, usersCollection } from "@/lib/constants/mongo";
import { SAVED_PROJECTS_PAGE } from "@/lib/constants/page-routes";
import { fetchSavedProjects } from "@/lib/server-actions/helper-actions";
import type { SavedProjectType } from "@/types/saved-project-types";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

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
				revalidatePath(SAVED_PROJECTS_PAGE);
			} else {
				throw new Error(SAME_PROJECT_NAME_ERROR);
			}
		}
	} catch (error) {
		throw error; // handled on the client side.
	}
}

export async function deleteProjectAction(name: string): Promise<void> {
	const { userId } = auth();
	const filter = { userId };
	try {
		const savedProjects = await fetchSavedProjects();
		if (savedProjects instanceof Error) throw savedProjects;

		if (savedProjects) {
			const updatedProjects = savedProjects.filter(project => project.name !== name);
			await mongoClient.connect();
			await usersCollection.updateOne(filter, { $set: { savedProjects: updatedProjects } });
			revalidatePath(SAVED_PROJECTS_PAGE);
		}
	} catch (error) {
		throw error; // handle on the client side.
	}
}
