"use client";
import { HelpPopover } from "@/components/ui/help-popover";
import { selectBaseMaterial, selectViaHoles, setViaHoles } from "@/lib/redux/reducers/rigid-pcb-slice";
import { useDispatch } from "@/lib/redux/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";

export function RigidViaHoles() {
	const dispatch = useDispatch();
	const viaHoles = useSelector(selectViaHoles);
	const baseMaterial = useSelector(selectBaseMaterial);

	return (
		<div hidden={baseMaterial === "Aluminum" || baseMaterial === "CopperCore"}>
			<Label>
				Via Holes <ViaHolesTip />
			</Label>
			<Input
				placeholder="Enter number of Via Holes"
				type="number"
				name="ViaHoles"
				autoComplete="off"
				className="w-full"
				required
				onChange={e => {
					dispatch(setViaHoles(Number(e.target.value)));
				}}
				value={viaHoles}
			/>
		</div>
	);
}

function ViaHolesTip() {
	return (
		<HelpPopover>
			<p>The number of via holes in the PCB.</p>
		</HelpPopover>
	);
}
