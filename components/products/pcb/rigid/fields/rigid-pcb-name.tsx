"use client";
import { HelpPopover } from "@/components/ui/help-popover";
import { selectName, setName } from "@/lib/redux/reducers/rigid-pcb-slice";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";

export function RigidPcbName() {
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
				PCB Name <NameTip />
			</Label>
			<Input
				data-testid="rigid-pcb-name"
				placeholder="Enter your PCB name"
				type="text"
				name="pcbname"
				autoComplete="off"
				className="w-full"
				required
				onChange={handleChange}
				value={value}
			/>
		</div>
	);
}

function NameTip() {
	return (
		<HelpPopover>
			<p>This is the name of your PCB. It is used for the reference in the order confirmation email.</p>
		</HelpPopover>
	);
}
