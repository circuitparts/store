"use client";
import { PcbPriceEstimateAlert } from "@/components/products/pcb/pcb-price-est-alert";
import { RigidBaseMaterial } from "@/components/products/pcb/rigid/fields/rigid-base-material";
import { RigidBoardOutlineTolerance } from "@/components/products/pcb/rigid/fields/rigid-board-outline-tolerance";
import { RigidBoardSize } from "@/components/products/pcb/rigid/fields/rigid-board-size";
import { RigidBoardThickness } from "@/components/products/pcb/rigid/fields/rigid-board-thickness";
import { RigidBreakdownVoltage } from "@/components/products/pcb/rigid/fields/rigid-breakdown-voltage";
import { RigidCastellatedHolesEdges } from "@/components/products/pcb/rigid/fields/rigid-cast-hole-edges";
import { RigidCastellatedHoles } from "@/components/products/pcb/rigid/fields/rigid-castellated-holes";
import { RigidChamferedGoldFingers } from "@/components/products/pcb/rigid/fields/rigid-chamfered-gold-fingers";
import { RigidCopperStructure } from "@/components/products/pcb/rigid/fields/rigid-cu-structure";
import { RigidDesignFormat } from "@/components/products/pcb/rigid/fields/rigid-design-format";
import { RigidDifferentDesignsInPanel } from "@/components/products/pcb/rigid/fields/rigid-diff-designs-in-panel";
import { DispatchUnit } from "@/components/products/pcb/rigid/fields/rigid-dispatch-unit";
import { RigidEdgeRailsSize } from "@/components/products/pcb/rigid/fields/rigid-edge-rail-size";
import { RigidEdgeRails } from "@/components/products/pcb/rigid/fields/rigid-edge-rails";
import { RigidGoldFingers } from "@/components/products/pcb/rigid/fields/rigid-gold-fingers";
import { RigidGoldThickness } from "@/components/products/pcb/rigid/fields/rigid-gold-thickness";
import { RigidImpedanceControl } from "@/components/products/pcb/rigid/fields/rigid-impedance-control";
import { RigidInnerCuWeight } from "@/components/products/pcb/rigid/fields/rigid-inner-cu-weight";
import { RigidLayer } from "@/components/products/pcb/rigid/fields/rigid-layer";
import { RigidLeadTime } from "@/components/products/pcb/rigid/fields/rigid-lead-time";
import { RigidMaterialType } from "@/components/products/pcb/rigid/fields/rigid-material-type";
import { RigidMinimumHoleSizeAndDiameter } from "@/components/products/pcb/rigid/fields/rigid-min-via-hole-size-and-dia";
import { RigidOuterCuWeight } from "@/components/products/pcb/rigid/fields/rigid-outer-cu-weight";
import { RigidPanelFormat } from "@/components/products/pcb/rigid/fields/rigid-panel-format";
import { RigidPanelQuantity } from "@/components/products/pcb/rigid/fields/rigid-panel-quantity";
import { RigidPanelSize } from "@/components/products/pcb/rigid/fields/rigid-panel-size";
import { RigidPcbName } from "@/components/products/pcb/rigid/fields/rigid-pcb-name";
import { RigidPcbQuantity } from "@/components/products/pcb/rigid/fields/rigid-pcb-quantity";
import { RigidSilkscreen } from "@/components/products/pcb/rigid/fields/rigid-silkscreen";
import { RigidSinglePiecesQuantity } from "@/components/products/pcb/rigid/fields/rigid-single-pieces-quantity";
import { RigidSoldermask } from "@/components/products/pcb/rigid/fields/rigid-soldermask";
import { RigidSurfaceFinish } from "@/components/products/pcb/rigid/fields/rigid-surface-finish";
import { RigidThermalConductivity } from "@/components/products/pcb/rigid/fields/rigid-thermal-conductivity";
import { RigidUploadDesignFile } from "@/components/products/pcb/rigid/fields/rigid-upload-design-file";
import { RigidViaCovering } from "@/components/products/pcb/rigid/fields/rigid-via-covering";
import { RigidViaHoles } from "@/components/products/pcb/rigid/fields/rigid-via-holes";
import { RigidPcbPriceSummary } from "@/components/products/pcb/rigid/rigid-pcb-price-summary";
import { ButtonWithSpinner } from "@/components/ui/button-with-spinner";
import { selectRigidPcb } from "@/lib/redux/reducers/rigid-pcb-slice";
import { addItemToCartAction } from "@/lib/server-actions/cart-actions";
import type { RigidPcbFabSpecsType } from "@/types/rigid-pcb-types";
import { useToast } from "@/components/ui/use-toast";
import { useTransition, type FormEvent } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { PCB_FAB_HELP_PAGE } from "@/lib/constants/page-routes";

export default function RigidPcbFabrication() {
	const { toast } = useToast();
	const [isLoading, startTransition] = useTransition();
	const rigidPcb: RigidPcbFabSpecsType = useSelector(selectRigidPcb);
	const isFileUploaded = rigidPcb.UploadedFileUrl ? true : false;

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
				await addItemToCartAction(rigidPcb);
				toast({
					variant: "default",
					title: "Rigid PCB added to cart",
					description: "We've successfully added your pcb to cart!",
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
					data-testid="rigid-pcb-fab-title">
					Rigid Pcb Fabrication
				</h1>
				<div className="grid grid-cols-1 gap-y-3 lg:grid-cols-3 lg:gap-x-4">
					<div className="mt-5 grid grid-cols-1 gap-y-6 sm:col-span-2 sm:grid-cols-2 sm:gap-x-4">
						<RigidPcbName />
						<RigidBaseMaterial />
						<RigidLayer />
						<RigidMaterialType />
						<RigidBoardSize />
						<RigidPcbQuantity />
						<RigidDifferentDesignsInPanel />
						<RigidDesignFormat />
						<RigidPanelQuantity />
						<RigidPanelFormat />
						<RigidPanelSize />
						<RigidSinglePiecesQuantity />
						<RigidBoardThickness />
						<RigidSoldermask />
						<RigidSilkscreen />
						<RigidSurfaceFinish />
						<RigidGoldThickness />
						<RigidEdgeRails />
						<RigidEdgeRailsSize />
						<RigidOuterCuWeight />
						<RigidCopperStructure />
						<RigidThermalConductivity />
						<RigidBreakdownVoltage />
						<RigidInnerCuWeight />
						<RigidImpedanceControl />
						<RigidViaCovering />
						<RigidMinimumHoleSizeAndDiameter />
						<RigidBoardOutlineTolerance />
						<RigidGoldFingers />
						<RigidChamferedGoldFingers />
						<RigidCastellatedHoles />
						<RigidCastellatedHolesEdges />
						<RigidViaHoles />
						<RigidLeadTime />
						<DispatchUnit />
						<RigidUploadDesignFile />
					</div>
					<div className="mt-8 space-y-4">
						<RigidPcbPriceSummary />
						<PcbPriceEstimateAlert />
						<ButtonWithSpinner
							data-testid="add-to-cart-button"
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
								Learn How to order Rigid PCB
							</Link>
						</p>
					</div>
				</div>
			</div>
		</form>
	);
}
