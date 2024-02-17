"use client";
import { HelpPopover } from "@/components/ui/help-popover";
import {
	selectNumOfThroughHoleComponents,
	setNumOfThroughHoleComponents,
} from "@/lib/redux/reducers/pcb-assembly-slice";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";

export function AssemblyThroughHoleComponentsQuantity() {
	const dispatch = useDispatch();
	const numOfThroughHoleComponents = useSelector(selectNumOfThroughHoleComponents);

	return (
		<div>
			<Label>
				Number of through-hole components
				<UniqueThroughHoleTip />
			</Label>
			<Input
				placeholder="Enter through-hole components quantity"
				type="text"
				name="throughHoleComponentsQty"
				autoComplete="off"
				className="w-full"
				required
				onChange={e => dispatch(setNumOfThroughHoleComponents(Number(e.target.value)))}
				value={numOfThroughHoleComponents}
			/>
		</div>
	);
}

function UniqueThroughHoleTip() {
	return (
		<HelpPopover>
			<p>How many number of through-hole components are present on the board.</p>
		</HelpPopover>
	);
}
