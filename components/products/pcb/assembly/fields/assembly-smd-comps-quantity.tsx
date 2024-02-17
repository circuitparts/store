"use client";
import { HelpPopover } from "@/components/ui/help-popover";
import { selectNumOfSmdComponents, setNumOfSmdComponents } from "@/lib/redux/reducers/pcb-assembly-slice";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";

export function AssemblySmdComponentsQuantity() {
	const dispatch = useDispatch();
	const numOfSmdComponents = useSelector(selectNumOfSmdComponents);

	return (
		<div>
			<Label>
				Number of smd components
				<UniqueSmdTip />
			</Label>
			<Input
				placeholder="Enter SMD components quantity"
				type="text"
				name="smdComponentsQty"
				autoComplete="off"
				className="w-full"
				required
				onChange={e => dispatch(setNumOfSmdComponents(Number(e.target.value)))}
				value={numOfSmdComponents}
			/>
		</div>
	);
}

function UniqueSmdTip() {
	return (
		<HelpPopover>
			<p>How many number of SMD components are present on the board.</p>
		</HelpPopover>
	);
}
