import { countryDailCodes } from "@/data/country-dail-codes";
import type { BillingAddressType, ShippingAddressType } from "@/types/address-types";

export function AddressDisplayCard({ address }: { address: BillingAddressType | ShippingAddressType }) {
	const country = countryDailCodes.find(country => country.name === address.country);
	return (
		<div>
			<div className="flex justify-between">
				<h2 className="text-xl font-semibold">{address.type}</h2>
			</div>

			<div className="space-y-1 my-2">
				<p>
					<span className="font-semibold">Name: </span>
					{address.firstName} {address.lastName}
				</p>
				<p>
					<span className="font-semibold">Company: </span>
					{address.company}
				</p>
				<p>
					<span className="font-semibold">Address 1: </span>
					{address.address1}
				</p>
				<p>
					<span className="font-semibold">Address 2: </span>
					{address.address2}
				</p>
				<p>
					<span className="font-semibold">City: </span>
					{address.city}
				</p>
				<p>
					<span className="font-semibold">State: </span>
					{address.state}
				</p>
				<p>
					<span className="font-semibold">Country: </span>
					{address.country}
				</p>
				<p>
					<span className="font-semibold">Postal Code: </span>
					{address.postalCode}
				</p>
				<p>
					<span className="font-semibold">Phone: </span>
					{country?.dial_code + " " + address.phone}
				</p>
				{address.type === "Billing Address" && (
					<>
						<p>
							<span className="font-semibold">GST/VAT/Tax ID: </span>
							{address.taxId}
						</p>
						<p>
							<span className="font-semibold">PO: </span>
							{address.po}
						</p>
					</>
				)}
			</div>
		</div>
	);
}
