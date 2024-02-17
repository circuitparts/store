"use client";
import { HelpPopover } from "@/components/ui/help-popover";
import { selectBoardSizeX, selectBoardSizeY, setBoardSizeX, setBoardSizeY } from "@/lib/redux/reducers/rigid-pcb-slice";
import { useDispatch } from "@/lib/redux/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";

export function RigidBoardSize() {
	const dispatch = useDispatch();
	const boardSizeX = useSelector(selectBoardSizeX);
	const boardSizeY = useSelector(selectBoardSizeY);

	return (
		<div className="w-full">
			<Label>
				PCB / Panel Dimensions (mm) <BoardSizeTip />
			</Label>
			<div className="grid grid-cols-11">
				<Input
					required
					type="number"
					min={20}
					name="BoardSizeX"
					placeholder="PCB length in mm"
					autoComplete="off"
					className="col-span-5"
					value={boardSizeX === 0 ? "" : boardSizeX}
					onChange={e => {
						dispatch(setBoardSizeX(Number(e.target.value)));
					}}
				/>
				<p className="flex items-center justify-center">x</p>
				<Input
					required
					type="number"
					min={20}
					name="BoardSizeY"
					placeholder="PCB width in mm"
					autoComplete="off"
					className="col-span-5"
					value={boardSizeY === 0 ? "" : boardSizeY}
					onChange={e => {
						dispatch(setBoardSizeY(Number(e.target.value)));
					}}
				/>
			</div>
		</div>
	);
}

function BoardSizeTip() {
	return (
		<HelpPopover>
			<p>The dimension of single PCB or PCB panel you upload.</p>
		</HelpPopover>
	);
}
