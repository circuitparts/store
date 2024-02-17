"use client";
import { HelpPopover } from "@/components/ui/help-popover";
import {
	selectColumns,
	selectDesignFormat,
	selectRows,
	setColumns,
	setRows,
} from "@/lib/redux/reducers/flex-pcb-slice";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";

export function FlexPanelFormat() {
	const dispatch = useDispatch();
	const columns = useSelector(selectColumns);
	const rows = useSelector(selectRows);
	const designFormat = useSelector(selectDesignFormat);

	return (
		<div hidden={designFormat === "Single PCB"}>
			<Label>
				Panel Format (Rows x Columns) <PanelFormatTip />
			</Label>
			<div className="grid grid-cols-11">
				<Input
					required
					min={1}
					max={10}
					type="number"
					name="Rows"
					placeholder="Rows"
					autoComplete="off"
					className="col-span-5"
					value={rows === 0 ? "" : rows}
					onChange={e => dispatch(setRows(Number(e.target.value)))}
				/>
				<p className="flex items-center justify-center">x</p>
				<Input
					required
					min={1}
					max={10}
					type="number"
					name="Columns"
					placeholder="Columns"
					autoComplete="off"
					className="col-span-5"
					value={columns === 0 ? "" : columns}
					onChange={e => dispatch(setColumns(Number(e.target.value)))}
				/>
			</div>
		</div>
	);
}

function PanelFormatTip() {
	return (
		<HelpPopover>
			<p>
				The number of columns/rows in the board array(PCB panel). For example: 2 Columns, 3 Rows. Maximum 10
				columns and 10 Rows.
			</p>
		</HelpPopover>
	);
}
