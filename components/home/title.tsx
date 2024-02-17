import { CircuitPartsLogo } from "@/components/logo";
import { PLATFORM_NAME } from "@/lib/constants/app";

export function Title() {
	return (
		<div className="flex h-16 shrink-0 items-center justify-center space-x-2">
			<CircuitPartsLogo />
			<h1 className="scroll-m-20 text-3xl font-bold tracking-tight transition-colors md:text-4xl">
				{PLATFORM_NAME}
			</h1>
		</div>
	);
}
