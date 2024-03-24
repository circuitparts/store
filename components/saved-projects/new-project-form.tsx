"use client";
import { ButtonWithSpinner } from "@/components/ui/button-with-spinner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { createNewSavedProjectAction } from "@/lib/server-actions/saved-project-actions";
import { useState, useTransition } from "react";

export function NewProjectForm() {
	const { toast } = useToast();
	const [isLoading, startTransition] = useTransition();
	const [projectName, setProjectName] = useState<string>("");

	function handleOnClick() {
		startTransition(async () => {
			try {
				await createNewSavedProjectAction(projectName);
			} catch (error) {
				if (error instanceof Error) {
					toast({
						variant: "destructive",
						title: error.name,
						description: error.message,
						duration: 5000,
					});
				}
			}
		});
	}

	return (
		<>
			<div className="grid gap-2">
				<Label htmlFor="projectname">Enter your Project Name</Label>
				<Input
					data-testid="project-name-input"
					id="projectname"
					name="projectname"
					type="text"
					placeholder="Enter your project name"
					autoComplete="off"
					required
					onChange={e => setProjectName(e.target.value)}
				/>
			</div>
			<ButtonWithSpinner
				data-testid="create-project-button"
				isLoading={isLoading}
				label={"Create Project"}
				className="w-full"
				onClick={handleOnClick}
			/>
		</>
	);
}
