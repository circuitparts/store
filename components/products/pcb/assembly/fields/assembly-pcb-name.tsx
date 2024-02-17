"use client";
import { HelpPopover } from "@/components/ui/help-popover";
import { selectName, setName } from "@/lib/redux/reducers/pcb-assembly-slice";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";

export function AssemblyPcbName() {
	const dispatch = useDispatch();
	const name = useSelector(selectName);
	const [value, setValue] = useState(name);

	const debouncedSetName = useDebouncedCallback((input: string) => {
		dispatch(setName(input));
	}, 1500); // 1.5 seconds

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		debouncedSetName(e.target.value);
	};

	return (
		<div>
			<Label>
				PCB Name <PcbNameTip />
			</Label>
			<Input
				placeholder="Enter your project name"
				type="text"
				name="projectName"
				autoComplete="off"
				className="w-full"
				required
				onChange={handleChange}
				value={value}
			/>
		</div>
	);
}

function PcbNameTip() {
	return (
		<HelpPopover>
			<p>This is the name of your Pcb. It is used for the reference in the order confirmation email.</p>
		</HelpPopover>
	);
}
