import Image, { type StaticImageData } from "next/image";

export function Flag(props: { flag: StaticImageData; country: string }) {
	const { flag, country } = props;
	return (
		<div className="flex items-center">
			<Image
				src={flag}
				width={24}
				height={24}
				alt={country}
			/>
		</div>
	);
}
