export type PcbFabQuoteType = {
	unitPrice: number;
	netPrice: number;
	quantity: number;
	setupCharges?: number; // only for pcb assembly
};
