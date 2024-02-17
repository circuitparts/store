import Image from "next/image";
import logo from "@/public/images/logo.png";

export function CircuitPartsLogo() {
	return (
		<Image
			src={logo}
			alt="Logo"
			height={30}
			width={30}
		/>
	);
}
