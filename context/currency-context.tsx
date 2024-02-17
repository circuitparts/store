"use client";
import Loading from "@/app/loading";
import { USD_CURR_CODE } from "@/lib/constants/app";
import { getCurrencyByIPAddr } from "@/lib/utils";
import type { CurrencyContextProviderType, CurrencyContextType } from "@/types/context-types";
import type { CurrencyType } from "@/types/currency-types";
import { createContext, useEffect, useState } from "react";

export const CurrencyContext = createContext({} as CurrencyContextType);

export const CurrencyProvider = ({ children }: CurrencyContextProviderType) => {
	const [isLoading, setIsLoading] = useState(true);
	const [currency, setCurrency] = useState<CurrencyType>(USD_CURR_CODE);

	useEffect(() => {
		setIsLoading(true);
		getCurrencyByIPAddr()
			.then(currencyData => {
				if (currencyData) {
					setCurrency(currencyData);
				}
			})
			.catch(console.error)
			.finally(() => setIsLoading(false));
	}, []);

	return (
		<CurrencyContext.Provider value={{ currency, setCurrency }}>
			{isLoading ? <Loading /> : children}
		</CurrencyContext.Provider>
	);
};
