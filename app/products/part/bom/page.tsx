"use client";
import { useHandleFileUploadError } from "@/components/hooks/useHandleFileUploadError";
import { ButtonWithSpinner } from "@/components/ui/button-with-spinner";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { BOM_PARSER_API_ENDPOINT, SHOPPING_CART_PAGE } from "@/lib/constants/page-routes";
import { addMultiplePartsToCartAction } from "@/lib/server-actions/cart-actions";
import type { SortedResultsType } from "@/types/part-types";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function UploadBomPage() {
	const [bomFile, setBomFile] = useState<File | undefined>();
	const [isLoading, startTransition] = useTransition();
	const { toast } = useToast();
	const router = useRouter();
	const handleFileUploadError = useHandleFileUploadError();

	function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.files) {
			setBomFile(e.target.files[0]);
		}
	}

	function handleFileUpload() {
		startTransition(async () => {
			if (!bomFile) {
				toast({
					variant: "destructive",
					title: "Please upload your BoM",
					description: "Please upload your BoM file to continue",
					duration: 4000,
				});
				return;
			}
			try {
				const formData = new FormData();
				formData.set("file", bomFile);
				const response = await fetch(BOM_PARSER_API_ENDPOINT, {
					method: "POST",
					body: formData,
				});
				if (!response.ok) throw new Error(await response.text());
				const results = (await response.json()) as SortedResultsType;

				await addMultiplePartsToCartAction(results.availableParts);

				// back ordered parts
				await addMultiplePartsToCartAction(results.backOrderedParts);

				router.push(SHOPPING_CART_PAGE);
			} catch (error) {
				handleFileUploadError(error, "UPLOAD BOM FILE FAULT");
			}
		});
	}

	return (
		<div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0 sm:mb-80 mt-8">
			<h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">Upload your Bill of Materials</h1>
			<p className="mt-2 text-sm text-muted-foreground">
				Upload your Bill of Materials (BOM) to quickly add components to your cart.
			</p>
			<p className="mt-4 mb-2 text-lg font-semibold">Things to keep in mind:</p>
			<ul className="list-disc ml-6 space-y-1">
				<li>At the moment we only support CSV file that is under 2MB.</li>
				<li>
					Please use our template to upload your BOM 👉{" "}
					<span>
						<a
							className="underline"
							href="/bom_template.csv"
							download={"Circuit_parts_bom_template"}>
							Download Circuit Parts BOM Template
						</a>
					</span>
				</li>
			</ul>
			<div className="flex w-full max-w-sm items-center space-x-2">
				<Input
					type="file"
					id="file"
					name="file"
					accept=".csv"
					className="my-4 w-full md:w-96 "
					placeholder="Upload your BOM file"
					onChange={handleFileChange}
				/>
				<ButtonWithSpinner
					isLoading={isLoading}
					label={"Upload"}
					onClick={handleFileUpload}
				/>
			</div>
		</div>
	);
}
