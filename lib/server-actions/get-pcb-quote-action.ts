"use server";
import { FLEX_PCB_API_END_POINT, PCB_ASSEMBLY_API_ENDPOINT, RIGID_PCB_API_ENDPOINT } from "@/lib/constants/app";
import type { FlexPcbQuoteSpecsType } from "@/types/flex-pcb-types";
import type { PcbAssemblyQuoteSpecsType } from "@/types/pcb-assembly-types";
import type { PcbFabQuoteType } from "@/types/pcb-quote-types";
import type { RigidPcbQuoteSpecsType } from "@/types/rigid-pcb-types";

export async function getRigidPcbQuoteAction(specs: RigidPcbQuoteSpecsType): Promise<PcbFabQuoteType | null> {
	try {
		const response = await fetch(RIGID_PCB_API_ENDPOINT, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(specs),
		});
		return (await response.json()) as PcbFabQuoteType;
	} catch (error) {
		throw error;
	}
}

export async function getFlexPcbQuoteAction(specs: FlexPcbQuoteSpecsType): Promise<PcbFabQuoteType | null> {
	try {
		const response = await fetch(FLEX_PCB_API_END_POINT, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(specs),
		});
		return (await response.json()) as PcbFabQuoteType;
	} catch (error) {
		throw error;
	}
}

export async function getPcbAssemblyQuoteAction(specs: PcbAssemblyQuoteSpecsType): Promise<PcbFabQuoteType | null> {
	try {
		const response = await fetch(PCB_ASSEMBLY_API_ENDPOINT, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(specs),
		});
		return (await response.json()) as PcbFabQuoteType;
	} catch (error) {
		throw error;
	}
}
