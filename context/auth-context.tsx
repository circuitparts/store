"use client";
import Loading from "@/app/loading";
import type { AuthContextProviderType, AuthContextType } from "@/types/context-types";
import { useUser } from "@clerk/nextjs";
import React from "react";

export const AuthContext = React.createContext({} as AuthContextType);

export const AuthProvider = ({ children }: AuthContextProviderType) => {
	const { user, isSignedIn, isLoaded } = useUser();
	return (
		<AuthContext.Provider value={{ isSignedIn, user, isLoaded }}>
			{isLoaded ? children : <Loading />}
		</AuthContext.Provider>
	);
};
