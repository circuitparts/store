"use client";
import { HelpPopover } from "@/components/ui/help-popover";
import { selectBoardType, selectPcbsPerPanel, setPcbsPerPanel } from "@/lib/redux/reducers/pcb-assembly-slice";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";

export function AssemblyPcbsPerPanel() {
	const dispatch = useDispatch();
	const pcbsPerPanel = useSelector(selectPcbsPerPanel);
	const boardType = useSelector(selectBoardType);

	return (
		<div hidden={boardType === "Single PCB"}>
			<Label>
				Pcbs per Panel <PcbsPerPanelTip />
			</Label>
			<Input
				placeholder="Enter Pcbs/Panel"
				type="text"
				name="PcbsPerPanel"
				autoComplete="off"
				className="w-full"
				required
				onChange={e => dispatch(setPcbsPerPanel(Number(e.target.value)))}
				value={pcbsPerPanel === 0 ? "" : pcbsPerPanel}
			/>
		</div>
	);
}

function PcbsPerPanelTip() {
	return (
		<HelpPopover>
			<p>How many single pcbs you have on your panel</p>
		</HelpPopover>
	);
}
