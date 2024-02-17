import { createAppAsyncThunk } from "@/lib/redux/createAppAsyncThunk";
import {
	getFlexPcbQuoteAction,
	getPcbAssemblyQuoteAction,
	getRigidPcbQuoteAction,
} from "@/lib/server-actions/get-pcb-quote-action";
import type { FlexPcbQuoteSpecsType } from "@/types/flex-pcb-types";
import type { PcbAssemblyQuoteSpecsType } from "@/types/pcb-assembly-types";
import type { RigidPcbQuoteSpecsType } from "@/types/rigid-pcb-types";

export const calculateRigidPcbPrice = createAppAsyncThunk(
	"pcb/calculateRigidPcbPrice",
	async (pcb: RigidPcbQuoteSpecsType) => {
		const response = await getRigidPcbQuoteAction(pcb);
		if (!response) {
			throw new Error("RIGID PCB PRICE CALCULATION FAULT");
		}
		return response;
	}
);

export const calculateFlexPcbPrice = createAppAsyncThunk(
	"pcb/calculateFlexPcbPrice",
	async (pcb: FlexPcbQuoteSpecsType) => {
		const response = await getFlexPcbQuoteAction(pcb);
		if (!response) {
			throw new Error("FLEX PCB PRICE CALCULATION FAULT");
		}
		return response;
	}
);

export const calculatePcbAssemblyPrice = createAppAsyncThunk(
	"pcb/calculatePcbAssemblyPrice",
	async (pcb: PcbAssemblyQuoteSpecsType) => {
		const response = await getPcbAssemblyQuoteAction(pcb);
		if (!response) {
			throw new Error("PCB ASSEMBLY PRICE CALCULATION FAULT");
		}
		return response;
	}
);
