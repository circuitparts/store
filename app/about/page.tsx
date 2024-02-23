export default function About() {
	return (
		<div className="px-4 sm:px-32">
			<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">What is Circuit Parts?</h1>
			<div className="space-y-10 mt-10">
				<div className="space-y-4">
					<h2 className="text-2xl font-bold">The Shorter Version</h2>
					<p>
						Circuit Parts is a digital quote-to-order Platform. It allows users to easily search components
						using manufacturer part number, specify quantities, and add items to their cart. In addition to
						component ordering, users can upload their PCB design files, receive instant quotes, and place
						orders for their custom designs.
					</p>
				</div>
				<div className="space-y-4">
					<h2 className="text-2xl font-bold">The Longer Version</h2>
					<p>
						If you were to open up your mobile phone, or as a matter of fact any modern electronic device
						and examine, you’d find a Printed Circuit Board or a PCB in short. This PCB is packed with full
						of electronic components ranging from tens to even thousands of components on single board
						depending on the product. These components are interconnected to form a circuit which makes the
						device function. Now imagine you were to design and build this product. After months of work,
						you have the design files (blueprints) and Bill of Materials (shopping list) ready to start
						manufacturing. That&apos;s where things start to get complicated...The traditional process of
						finding, vetting, and managing suppliers, getting quotes, and tracking orders across many
						component distributors and PCB manufacturers is incredibly resource-intensive and prone to
						miscommunication, delays, and mistakes. These barriers make hardware development a slow,
						painful, high-risk endeavor.
					</p>
				</div>
				<div className="space-y-4">
					<h2 className="text-2xl font-bold">Our Solution</h2>
					<p>
						We engineered a new approach — A digital quote-to-order platform. It provides a convenient place
						for individuals and businesses to purchase electronic and semiconductor components, upload
						designs and receive instant quotes for PCB fabrication and assembly, all in one place,
						eliminating the need to navigate multiple websites.
					</p>
				</div>
			</div>
		</div>
	);
}
