"use client";
import { FlexBaseMaterial } from "@/components/products/pcb/flex/fields/flex-base-material";
import { FlexBoardOutlineTolerance } from "@/components/products/pcb/flex/fields/flex-board-outline-tolerance";
import { FlexBoardSize } from "@/components/products/pcb/flex/fields/flex-board-size";
import { FlexBoardThickness } from "@/components/products/pcb/flex/fields/flex-board-thickness";
import { FlexCopperType } from "@/components/products/pcb/flex/fields/flex-copper-type";
import { FlexCoverlayColor } from "@/components/products/pcb/flex/fields/flex-coverlay-color";
import { FlexCoverlayThickness } from "@/components/products/pcb/flex/fields/flex-coverlay-thickness";
import { FlexCuttingMethod } from "@/components/products/pcb/flex/fields/flex-cutting-method";
import { FlexDesignFormat } from "@/components/products/pcb/flex/fields/flex-design-format";
import { FlexDifferentDesignsInPanel } from "@/components/products/pcb/flex/fields/flex-different-designs-in-panel";
import { FlexDispatchUnit } from "@/components/products/pcb/flex/fields/flex-dispatch-unit";
import { FlexEdgeRails } from "@/components/products/pcb/flex/fields/flex-edge-rail";
import { FlexEdgeRailsSize } from "@/components/products/pcb/flex/fields/flex-edge-rail-size";
import { FlexEMIShieldingFilm } from "@/components/products/pcb/flex/fields/flex-emi-shielding-film";
import { FlexFR4Thickness } from "@/components/products/pcb/flex/fields/flex-fr4-thickness";
import { FlexGoldThickness } from "@/components/products/pcb/flex/fields/flex-gold-thickness";
import { FlexLayer } from "@/components/products/pcb/flex/fields/flex-layer";
import { FlexLeadTime } from "@/components/products/pcb/flex/fields/flex-lead-time";
import { FlexOuterCuWeight } from "@/components/products/pcb/flex/fields/flex-outer-cu-weight";
import { FlexPanelFormat } from "@/components/products/pcb/flex/fields/flex-panel-format";
import { FlexPanelQuantity } from "@/components/products/pcb/flex/fields/flex-panel-quantity";
import { FlexPanelSize } from "@/components/products/pcb/flex/fields/flex-panel-size";
import { FlexPcbName } from "@/components/products/pcb/flex/fields/flex-pcb-name";
import { FlexPcbQuantity } from "@/components/products/pcb/flex/fields/flex-pcb-quantity";
import { FlexPolyimideThickness } from "@/components/products/pcb/flex/fields/flex-polyimide-thickness";
import { FlexSilkscreen } from "@/components/products/pcb/flex/fields/flex-silkscreen";
import { FlexSinglePiecesQuantity } from "@/components/products/pcb/flex/fields/flex-single-pieces-quantity";
import { FlexStainlessSteelThickness } from "@/components/products/pcb/flex/fields/flex-ss-thickness";
import { FlexStiffener } from "@/components/products/pcb/flex/fields/flex-stiffener";
import { FlexSurfaceFinish } from "@/components/products/pcb/flex/fields/flex-surface-finish";
import { FlexThreeMTapeThickness } from "@/components/products/pcb/flex/fields/flex-three-m-tape-thickness";
import { FlexUploadDesignFile } from "@/components/products/pcb/flex/fields/flex-upload-design-file";
import { FlexPcbPriceSummary } from "@/components/products/pcb/flex/flex-pcb-price-summary";
import { PcbPriceEstimateAlert } from "@/components/products/pcb/pcb-price-est-alert";
import { ButtonWithSpinner } from "@/components/ui/button-with-spinner";
import { useToast } from "@/components/ui/use-toast";
import { PCB_FAB_HELP_PAGE } from "@/lib/constants/page-routes";
import { selectFlexPcb } from "@/lib/redux/reducers/flex-pcb-slice";
import { addItemToCartAction } from "@/lib/server-actions/cart-actions";
import type { FlexPcbFabSpecsType } from "@/types/flex-pcb-types";
import Link from "next/link";
import { useTransition, type FormEvent } from "react";
import { useSelector } from "react-redux";

export default function FlexPcbFabrication() {
	const { toast } = useToast();
	const [isLoading, startTransition] = useTransition();
	const flexPcb: FlexPcbFabSpecsType = useSelector(selectFlexPcb);
	const isFileUploaded = flexPcb.UploadedFileUrl ? true : false;

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
				await addItemToCartAction(flexPcb);
				toast({
					variant: "default",
					title: "Flex PCB added to cart",
					description: "We've successfully added your pcb to cart!",
					duration: 4000,
				});
			}
		});
	}

	return (
		<form onSubmit={handleOnSubmit}>
			<div className="mx-auto my-2 max-w-6xl px-4">
				<h1 className=" text-3xl font-bold tracking-tight">Flex Pcb Fabrication</h1>
				<div className="grid grid-cols-1 gap-y-3 lg:grid-cols-3 lg:gap-x-4">
					<div className="mt-5 grid grid-cols-1 gap-y-6 sm:col-span-2 sm:grid-cols-2 sm:gap-x-4">
						<FlexPcbName />
						<FlexBaseMaterial />
						<FlexLayer />
						<FlexBoardSize />
						<FlexDifferentDesignsInPanel />
						<FlexDesignFormat />
						<FlexPcbQuantity />
						<FlexPanelQuantity />
						<FlexPanelFormat />
						<FlexPanelSize />
						<FlexSinglePiecesQuantity />
						<FlexBoardThickness />
						<FlexCoverlayColor />
						<FlexSilkscreen />
						<FlexCopperType />
						<FlexSurfaceFinish />
						<FlexGoldThickness />
						<FlexOuterCuWeight />
						<FlexCoverlayThickness />
						<FlexStiffener />
						<FlexPolyimideThickness />
						<FlexFR4Thickness />
						<FlexStainlessSteelThickness />
						<FlexThreeMTapeThickness />
						<FlexEMIShieldingFilm />
						<FlexEdgeRails />
						<FlexEdgeRailsSize />
						<FlexBoardOutlineTolerance />
						<FlexCuttingMethod />
						<FlexLeadTime />
						<FlexDispatchUnit />
						<FlexUploadDesignFile />
					</div>
					<div className="mt-8 space-y-4">
						<FlexPcbPriceSummary />
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
								Learn How to order Flex PCB
							</Link>
						</p>
					</div>
				</div>
			</div>
		</form>
	);
}
