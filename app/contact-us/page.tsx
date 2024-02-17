import { PLATFORM_NAME } from "@/lib/constants/app";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: `Contact Us | ${PLATFORM_NAME}`,
	description: "Contact us for any queries or support. We are happy to help you!",
};

export default function ContactUs() {
	return (
		<div className="py-10">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl space-y-16 divide-y divide-gray-200 lg:mx-0 lg:max-w-none">
					<div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
						<div>
							<h2 className="text-3xl font-bold tracking-tight">Get in touch</h2>
							<p className="mt-4 leading-7 text-muted-foreground">
								Got some queries? Reach out to us and we&apos;ll be more than happy to assist you!
							</p>
						</div>
						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
							<div className="rounded-2xl bg-gray-100 p-10">
								<h3 className="text-base font-semibold leading-7">Support</h3>
								<dl className="mt-3 space-y-1 text-sm leading-6">
									<div>
										<dt className="sr-only">Email</dt>
										<dd>
											<Link
												className="font-semibold hover:underline"
												href="mailto:help@circuitparts.in">
												help@circuitparts.in
											</Link>
										</dd>
									</div>
								</dl>
							</div>
							<div className="rounded-2xl bg-gray-100 p-10">
								<h3 className="text-base font-semibold leading-7">Whatsapp</h3>
								<dl className="mt-3 space-y-1 text-sm leading-6">
									<div className="mt-1">
										<dt className="sr-only">Phone number</dt>
										<dd className="hover:underline">+91 (789) 354-9803</dd>
									</div>
								</dl>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-1 gap-x-8 gap-y-10 pt-16 lg:grid-cols-3">
						<div>
							<h2 className="text-3xl font-bold tracking-tight">Locations</h2>
						</div>
						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
							<div className="rounded-2xl bg-gray-100 p-10">
								<h3 className="text-base font-semibold leading-7 text-gray-900">
									Hyderabad, Telangana
								</h3>
								<address className="mt-3 space-y-1 text-sm not-italic leading-6 text-muted-foreground">
									<p>Plot No 21, 22, Arunodaya Nagar, Uppal</p>
									<p>KV RangReddy District,</p>
									<p>Hyderabad, Telangana, India - 500068</p>
								</address>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
