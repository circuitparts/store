"use client";
import { reduxStore } from "@/lib/redux/store";
import { Provider } from "react-redux";

export function ReduxProvider(props: { children: React.ReactNode }) {
	return <Provider store={reduxStore}>{props.children}</Provider>;
}
