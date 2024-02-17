import type { CurrencyType } from "@/types/currency-types";
import type { UserResource } from "@clerk/types";
import type { Dispatch, SetStateAction } from "react";

export type AuthContextType = {
	isSignedIn: boolean | undefined;
	isLoaded: boolean;
	user: UserResource | undefined | null;
};

export type AuthContextProviderType = {
	children: React.ReactNode;
};

export type CurrencyContextType = {
	currency: CurrencyType;
	setCurrency: Dispatch<SetStateAction<CurrencyType>>;
};

export type CurrencyContextProviderType = {
	children: React.ReactNode;
};
