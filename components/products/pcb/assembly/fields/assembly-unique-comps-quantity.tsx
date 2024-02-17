"use client";
import { HelpPopover } from "@/components/ui/help-popover";
import { selectNumOfUniqueComponents, setNumOfUniqueComponents } from "@/lib/redux/reducers/pcb-assembly-slice";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";

export function AssemblyUniqueComponentsQuantity() {
	const dispatch = useDispatch();
	const numOfUniqueComponents = useSelector(selectNumOfUniqueComponents);

	return (
		<div>
			<Label>
				Number of unique components
				<UniqueComponentsTip />
			</Label>
			<Input
				placeholder="Enter unique components quantity"
				type="text"
				name="uniqueComponentsQty"
				autoComplete="off"
				className="w-full"
				required
				onChange={e => dispatch(setNumOfUniqueComponents(Number(e.target.value)))}
				value={numOfUniqueComponents === 0 ? "" : numOfUniqueComponents}
			/>
		</div>
	);
}

function UniqueComponentsTip() {
	return (
		<HelpPopover>
			<p>How many number of unique components are present on the board.</p>
		</HelpPopover>
	);
}
