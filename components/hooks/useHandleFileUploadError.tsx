"use client";
import { CONSOLE_RED_TEXT } from "@/lib/constants/app";
import { useToast } from "@/components/ui/use-toast";

export function useHandleFileUploadError() {
	const { toast } = useToast();
	return (err: unknown, title: string) => {
		let errorMessage: string | undefined = "Something went wrong, please try again later.";
		if (err instanceof Error) {
			errorMessage = err.message;
		}
		console.error(CONSOLE_RED_TEXT, `${title} => ${errorMessage}`);
		toast({
			variant: "destructive",
			title: "File Upload Error",
			description: errorMessage,
			duration: 4000,
		});
	};
}
