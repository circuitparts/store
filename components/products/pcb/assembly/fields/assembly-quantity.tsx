"use client";
import { HelpPopover } from "@/components/ui/help-popover";
import { selectBoardType, selectOrderedQty, setOrderedQty } from "@/lib/redux/reducers/pcb-assembly-slice";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";

export function AssemblyQuantity() {
	const dispatch = useDispatch();
	const quantity = useSelector(selectOrderedQty);
	const boardType = useSelector(selectBoardType);

	return (
		<div className="w-full">
			<Label>
				Assembly Quantity <span>{boardType === "Single PCB" ? "(No. of Pcbs)" : "(No. of Panels)"}</span>
				<AssemblyQtyTip />
			</Label>
			<Input
				placeholder="Enter assembly quantity"
				type="text"
				name="AssemblyQty"
				autoComplete="off"
				className="w-full"
				required
				onChange={e => dispatch(setOrderedQty(Number(e.target.value)))}
				value={quantity === 0 ? "" : quantity}
			/>
		</div>
	);
}

function AssemblyQtyTip() {
	return (
		<HelpPopover>
			<p>The quantity you&apos;d want to get assembled</p>
		</HelpPopover>
	);
}
