import { featuresContent } from "@/content/home-content";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import partResultsScreenShot from "@/public/images/screenshots/part-results.png";
import rigidPcbScreenShot from "@/public/images/screenshots/rigid-pcb.png";
import pcbAssemblyScreenShot from "@/public/images/screenshots/pcb-assembly.png";
import partDetailsScreenShot from "@/public/images/screenshots/part-details.png";

export function Features() {
	return (
		<div className="overflow-hidden py-8">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
					<FeatureSection />
					<CarouselImages />
				</div>
			</div>
		</div>
	);
}

function FeatureSection() {
	return (
		<div className="lg:pr-8 lg:pt-4">
			<div className="lg:max-w-lg">
				<p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">All-in-one platform</p>
				<p className="mt-6 leading-8 text-gray-600">
					Circuit Parts is a centralised platform for ordering Electronic and Semiconductor Components,
					Printed Circuit Board (PCB) fabrication and assembly services.
				</p>
				<dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
					{featuresContent.map(feature => (
						<div
							key={feature.id}
							className="relative">
							<dt className="inline font-semibold text-gray-900">{feature.name}</dt>{" "}
							<dd className="inline">{feature.description}</dd>
						</div>
					))}
				</dl>
			</div>
		</div>
	);
}

function CarouselImages() {
	return (
		<Carousel className="w-full max-w-2xl flex items-center">
			<CarouselContent>
				<CarouselItem>
					<Image
						alt="Part Results Screenshot"
						className="object-cover rounded-md"
						width={1000}
						height={600}
						src={partResultsScreenShot}
					/>
				</CarouselItem>
				<CarouselItem>
					<Image
						alt="Part Details Page Screenshot"
						className="object-cover rounded-md"
						width={1000}
						height={600}
						src={partDetailsScreenShot}
					/>
				</CarouselItem>
				<CarouselItem>
					<Image
						alt="Rigid PCB Fab Screenshot"
						className="object-cover rounded-md"
						width={1000}
						height={600}
						src={rigidPcbScreenShot}
					/>
				</CarouselItem>
				<CarouselItem>
					<Image
						alt="PCB Assembly Screenshot"
						className="object-cover rounded-md"
						width={1000}
						height={600}
						src={pcbAssemblyScreenShot}
					/>
				</CarouselItem>
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
