"use client";
import { useToast } from "@/components/ui/use-toast";
import { CONSOLE_RED_TEXT } from "@/lib/constants/app";
import { isClerkAPIResponseError } from "@clerk/nextjs";

export function useHandleAuthError() {
	const { toast } = useToast();
	return (err: unknown, title: string) => {
		let errorMessage: string | undefined = "Something went wrong, please try again later.";
		if (err instanceof Error) {
			errorMessage = err.message;
		} else if (isClerkAPIResponseError(err)) {
			errorMessage = err.errors[0]?.longMessage;
		}
		console.error(CONSOLE_RED_TEXT, `${title} => ${errorMessage}`);
		toast({
			variant: "destructive",
			title: "Authentication error",
			description: errorMessage,
			duration: 4000,
		});
	};
}
