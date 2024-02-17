import { upcomingFeaturesContent } from "@/content/upcoming-features-content";

export default function UpcomingFeatures() {
	return (
		<div className="mx-auto max-w-7xl px-6 lg:px-8">
			<Heading />
			<FeaturesList />
		</div>
	);
}

function Heading() {
	return (
		<div className="mx-auto max-w-none lg:text-center">
			<p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">And there is more...</p>
			<p className="mt-6 leading-8 text-gray-600">
				We have a ton of stuff on our roadmap that will be available for our users in the coming months
			</p>
		</div>
	);
}

function FeaturesList() {
	return (
		<div className="mx-auto mt-10 max-w-2xl sm:mt-20 lg:mt-10 lg:max-w-none">
			<dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
				{upcomingFeaturesContent.map(feature => (
					<div
						key={feature.name}
						className="flex flex-col">
						<dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
							{feature.name}
						</dt>
						<dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
							<p className="flex-auto">{feature.description}</p>
						</dd>
					</div>
				))}
			</dl>
		</div>
	);
}
