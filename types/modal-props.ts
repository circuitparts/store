import type { PcbType } from "@/types/pcb-types";


export type PcbFabSpecsModalProps = {
	fabSpecs: PcbType;
};

export type TableRowProps = {
	label: string;
	value: string | number | null;
	isVisible: boolean;
};
