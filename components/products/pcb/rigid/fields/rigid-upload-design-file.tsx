"use client";
import { useHandleFileUploadError } from "@/components/hooks/useHandleFileUploadError";
import { HelpPopover } from "@/components/ui/help-popover";
import { ButtonWithSpinner } from "@/components/ui/button-with-spinner";
import { UPLOAD_FILE_API_ENDPOINT } from "@/lib/constants/page-routes";
import { selectName, setUploadedFileName, setUploadedFileUrl } from "@/lib/redux/reducers/rigid-pcb-slice";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useTransition, type MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

export function RigidUploadDesignFile() {
	const [file, setFile] = useState<File | undefined>();
	const [isLoading, startTransition] = useTransition();
	const name = useSelector(selectName);
	const dispatch = useDispatch();
	const { toast } = useToast();
	const handleFileUploadError = useHandleFileUploadError();

	function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.files) {
			setFile(e.target.files[0]);
		}
	}

	async function handleFileUpload(event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
		startTransition(async () => {
			try {
				event.preventDefault();
				// Validate file
				if (!file || !(file instanceof Blob)) {
					toast({
						variant: "destructive",
						title: "File upload failed",
						description: "Invalid file. Please upload a valid zip file.",
						duration: 5000,
					});
					return;
				}

				if (name === "") {
					toast({
						variant: "destructive",
						title: "File upload failed",
						description: "Please provide a name for the PCB before uploading the file.",
						duration: 5000,
					});
					return;
				}

				const formData = new FormData();
				formData.set("file", file, name);
				const response = await fetch(UPLOAD_FILE_API_ENDPOINT, {
					method: "POST",
					body: formData,
				});

				if (!response.ok) throw new Error(response.statusText);

				const data = (await response.json()) as { filename: string; fileUrl: string };
				dispatch(setUploadedFileUrl(data.fileUrl));
				dispatch(setUploadedFileName(data.filename));

				toast({
					variant: "default",
					title: "File upload success",
					description: "We've successfully uploaded your file!",
					duration: 4000,
				});
			} catch (error) {
				handleFileUploadError(error, "UPLOAD RIGID DESIGN FILE FAULT");
			}
		});
	}

	return (
		<div>
			<Label>
				Upload Design Files(.zip) <UploadDesignTip />
			</Label>
			<div className="flex gap-x-2">
				<Input
					data-testid="rigid-pcb-fab-upload-design-file"
					required
					accept=".zip"
					id="file"
					type="file"
					autoComplete="off"
					className="w-full"
					onChange={handleFileChange}
				/>
				<ButtonWithSpinner
					data-testid="rigid-pcb-fab-upload-design-file-button"
					isLoading={isLoading}
					label={"Upload"}
					onClick={handleFileUpload}
				/>
			</div>
		</div>
	);
}

function UploadDesignTip() {
	return (
		<HelpPopover>
			<p>We only accept zip files and max size of the file should not be more than 16 MB</p>
		</HelpPopover>
	);
}
