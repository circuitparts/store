"use client";
import { AssemblyPcbPriceSummary } from "@/components/products/pcb/assembly/assembly-pcb-price-summary";
import { AssemblyBgaComponentsQuantity } from "@/components/products/pcb/assembly/fields/assembly-bga-quantity";
import { AssemblyBoardType } from "@/components/products/pcb/assembly/fields/assembly-board-type";
import { AssemblyComponentSourcing } from "@/components/products/pcb/assembly/fields/assembly-components-sourcing";
import { AssemblyConformalCoating } from "@/components/products/pcb/assembly/fields/assembly-conformal-coat";
import { AssemblyDepanel } from "@/components/products/pcb/assembly/fields/assembly-depanel";
import { AssemblyFunctionalTest } from "@/components/products/pcb/assembly/fields/assembly-functional-test";
import { AssemblyPcbName } from "@/components/products/pcb/assembly/fields/assembly-pcb-name";
import { AssemblyPcbsPerPanel } from "@/components/products/pcb/assembly/fields/assembly-pcbs-per-panel";
import { AssemblyQuantity } from "@/components/products/pcb/assembly/fields/assembly-quantity";
import { AssemblySides } from "@/components/products/pcb/assembly/fields/assembly-sides";
import { AssemblySmdComponentsQuantity } from "@/components/products/pcb/assembly/fields/assembly-smd-comps-quantity";
import { AssemblyTemperatureAndHumiditySensitivity } from "@/components/products/pcb/assembly/fields/assembly-temp-and-humidity-sensitivity";
import { AssemblyThroughHoleComponentsQuantity } from "@/components/products/pcb/assembly/fields/assembly-through-hole-comps-quantity";
import { AssemblyTurnAroundTime } from "@/components/products/pcb/assembly/fields/assembly-turn-around-time";
import { AssemblyUniqueComponentsQuantity } from "@/components/products/pcb/assembly/fields/assembly-unique-comps-quantity";
import { AssemblyUploadDesignFile } from "@/components/products/pcb/assembly/fields/assembly-upload-design-file";
import { PcbPriceEstimateAlert } from "@/components/products/pcb/pcb-price-est-alert";
import { ButtonWithSpinner } from "@/components/ui/button-with-spinner";
import { useToast } from "@/components/ui/use-toast";
import { PCB_FAB_HELP_PAGE } from "@/lib/constants/page-routes";
import { selectPcbAssembly } from "@/lib/redux/reducers/pcb-assembly-slice";
import { addItemToCartAction } from "@/lib/server-actions/cart-actions";
import type { PcbAssemblyFabSpecsType } from "@/types/pcb-assembly-types";
import Link from "next/link";
import { useTransition, type FormEvent } from "react";
import { useSelector } from "react-redux";

export default function PcbAssembly() {
	const { toast } = useToast();
	const [isLoading, startTransition] = useTransition();
	const pcbAssembly: PcbAssemblyFabSpecsType = useSelector(selectPcbAssembly);
	const isFileUploaded = pcbAssembly.UploadedFileUrl ? true : false;

	function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
		startTransition(async () => {
			e.preventDefault();
			if (!isFileUploaded) {
				toast({
					variant: "destructive",
					title: "Please upload design file",
					description: "Click the upload button to upload your design file and then continue.",
					duration: 5000,
				});
			} else {
				// handle add to cart
				await addItemToCartAction(pcbAssembly);
				toast({
					variant: "default",
					title: "PCB Assembly added to cart",
					description: "We've successfully added your assembly to cart!",
					duration: 4000,
				});
			}
		});
	}

	return (
		<form onSubmit={handleOnSubmit}>
			<div className="mx-auto my-2 max-w-6xl px-4">
				<h1
					className=" text-3xl font-bold tracking-tight"
					data-testid="pcb-assembly-fab-title">
					PCB Assembly
				</h1>
				<div className="grid grid-cols-1 gap-y-3 lg:grid-cols-3 lg:gap-x-4">
					<div className="mt-5 grid grid-cols-1 gap-y-6 sm:col-span-2 sm:grid-cols-2 sm:gap-x-4">
						<AssemblyPcbName />
						<AssemblyBoardType />
						<AssemblyPcbsPerPanel />
						<AssemblyQuantity />
						<AssemblySides />
						<AssemblyUniqueComponentsQuantity />
						<AssemblySmdComponentsQuantity />
						<AssemblyBgaComponentsQuantity />
						<AssemblyThroughHoleComponentsQuantity />
						<AssemblyTemperatureAndHumiditySensitivity />
						<AssemblyDepanel />
						<AssemblyConformalCoating />
						<AssemblyFunctionalTest />
						<AssemblyComponentSourcing />
						<AssemblyTurnAroundTime />
						<AssemblyUploadDesignFile />
					</div>
					<div className="mt-8 space-y-4">
						<AssemblyPcbPriceSummary />
						<PcbPriceEstimateAlert />
						<ButtonWithSpinner
							isLoading={isLoading}
							label={"Add to Cart"}
							type="submit"
							className="w-full"
						/>
						<p className="mt-2 text-sm text-muted-foreground">
							Need help?{" "}
							<Link
								href={PCB_FAB_HELP_PAGE}
								target="_blank"
								className="underline">
								Learn How to order PCB Assembly
							</Link>
						</p>
					</div>
				</div>
			</div>
		</form>
	);
}
