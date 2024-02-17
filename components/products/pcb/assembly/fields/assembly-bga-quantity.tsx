"use client";
import { HelpPopover } from "@/components/ui/help-popover";
import { selectNumOfBgaComponents, setNumOfBgaComponents } from "@/lib/redux/reducers/pcb-assembly-slice";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";

export function AssemblyBgaComponentsQuantity() {
	const dispatch = useDispatch();
	const numOfBgaComponents = useSelector(selectNumOfBgaComponents);

	return (
		<div>
			<Label>
				Number of BGA / QFP components
				<UniqueBGATip />
			</Label>
			<Input
				placeholder="Enter BGA/QFP components quantity"
				type="text"
				name="bgaQfpComponentsQty"
				autoComplete="off"
				className="w-full"
				required
				value={numOfBgaComponents}
				onChange={e => dispatch(setNumOfBgaComponents(Number(e.target.value)))}
			/>
		</div>
	);
}

function UniqueBGATip() {
	return (
		<HelpPopover>
			<p>How many number of BGA/QFP/QFN components are present on the board.</p>
		</HelpPopover>
	);
}
