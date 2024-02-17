import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { type SetStateAction } from "react";

export function ShowPasswordButton(props: {
	isPasswordVisible: boolean;
	setIsPasswordVisible: (value: SetStateAction<boolean>) => void;
}) {
	const { isPasswordVisible, setIsPasswordVisible } = props;
	return (
		<Button
			variant="ghost"
			size="sm"
			className="absolute right-0 top-0 h-10 w-10 px-3 py-2 hover:bg-transparent"
			onClick={() => setIsPasswordVisible(prev => !prev)}>
			{isPasswordVisible ? <Icons.eyeSlash aria-hidden="true" /> : <Icons.eye aria-hidden="true" />}
			<span className="sr-only">{isPasswordVisible ? "Hide password" : "Show password"}</span>
		</Button>
	);
}
