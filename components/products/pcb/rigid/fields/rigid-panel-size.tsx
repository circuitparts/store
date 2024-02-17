"use client";
import { HelpPopover } from "@/components/ui/help-popover";
import { selectDesignFormat, selectPanelSizeX, selectPanelSizeY } from "@/lib/redux/reducers/rigid-pcb-slice";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";

export function RigidPanelSize() {
	const panelSizeX = useSelector(selectPanelSizeX);
	const panelSizeY = useSelector(selectPanelSizeY);
	const designFormat = useSelector(selectDesignFormat);

	const isHidden = designFormat === "Single PCB" || designFormat === "Panel by Customer";

	return (
		<div hidden={isHidden}>
			<Label>
				Panel Size in mm (X/Y) <PanelSizeTip />
			</Label>
			<div className="grid grid-cols-11">
				<Input
					type="number"
					name="PanelSizeX"
					placeholder="Panel length in mm"
					autoComplete="off"
					className="col-span-5"
					value={panelSizeX}
					disabled
				/>
				<p className="flex items-center justify-center">x</p>
				<Input
					type="number"
					name="PanelSizeY"
					placeholder="Panel width in mm"
					autoComplete="off"
					className="col-span-5"
					value={panelSizeY}
					disabled
				/>
			</div>
		</div>
	);
}

function PanelSizeTip() {
	return (
		<HelpPopover>
			<p>The size of the panel after taking into consideration the edge rails and PCB size.</p>
		</HelpPopover>
	);
}
