import { ShippingCountry } from "@/components/checkout/address/ship-country";
import { ShippingState } from "@/components/checkout/address/ship-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	selectShippingAddress,
	setShippingAddress1,
	setShippingAddress2,
	setShippingCity,
	setShippingCompany,
	setShippingEmail,
	setShippingFirstName,
	setShippingLastName,
	setShippingPhone,
	setShippingPostalCode,
} from "@/lib/redux/reducers/address-slice";
import type { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ShippingAddressFields() {
	const dispatch = useDispatch();
	const shippingAddress = useSelector(selectShippingAddress);
	const inputProps = [
		{
			label: "Postal code *",
			type: "number",
			id: "ship_postalCode",
			name: "ship_postalCode",
			autoComplete: "off",
			className: "w-full",
			required: true,
			value: shippingAddress.postalCode,
			onChange: (e: ChangeEvent<HTMLInputElement>) => dispatch(setShippingPostalCode(e.target.value)),
		},
		{
			label: "City *",
			type: "text",
			id: "ship_city",
			name: "ship_city",
			autoComplete: "off",
			className: "w-full",
			required: true,
			value: shippingAddress.city,
			onChange: (e: ChangeEvent<HTMLInputElement>) => dispatch(setShippingCity(e.target.value)),
		},
		{
			label: "Address Line 1 *",
			type: "text",
			id: "ship_address1",
			name: "ship_address1",
			autoComplete: "off",
			className: "w-full",
			required: true,
			value: shippingAddress.address1,
			onChange: (e: ChangeEvent<HTMLInputElement>) => dispatch(setShippingAddress1(e.target.value)),
		},
		{
			label: "Address Line 2",
			type: "text",
			id: "ship_address2",
			name: "ship_address2",
			autoComplete: "off",
			className: "w-full",
			required: false,
			value: shippingAddress.address2,
			onChange: (e: ChangeEvent<HTMLInputElement>) => dispatch(setShippingAddress2(e.target.value)),
		},
		{
			label: "Company",
			type: "text",
			id: "ship_company",
			name: "ship_company",
			autoComplete: "off",
			className: "w-full",
			required: false,
			value: shippingAddress.company,
			onChange: (e: ChangeEvent<HTMLInputElement>) => dispatch(setShippingCompany(e.target.value)),
		},
		{
			label: "Email *",
			type: "email",
			id: "ship_email",
			name: "ship_email",
			autoComplete: "off",
			className: "w-full",
			required: true,
			value: shippingAddress.email,
			onChange: (e: ChangeEvent<HTMLInputElement>) => dispatch(setShippingEmail(e.target.value)),
		},
		{
			label: "First Name *",
			type: "text",
			id: "ship_fname",
			name: "ship_fname",
			autoComplete: "off",
			className: "w-full",
			required: true,
			value: shippingAddress.firstName,
			onChange: (e: ChangeEvent<HTMLInputElement>) => dispatch(setShippingFirstName(e.target.value)),
		},
		{
			label: "Last Name *",
			type: "text",
			id: "ship_lname",
			name: "ship_lname",
			autoComplete: "off",
			className: "w-full",
			required: true,
			value: shippingAddress.lastName,
			onChange: (e: ChangeEvent<HTMLInputElement>) => dispatch(setShippingLastName(e.target.value)),
		},
		{
			label: "Phone *",
			type: "number",
			id: "ship_phone",
			name: "ship_phone",
			autoComplete: "off",
			className: "w-full",
			required: true,
			value: shippingAddress.phone,
			onChange: (e: ChangeEvent<HTMLInputElement>) => dispatch(setShippingPhone(e.target.value)),
		},
	];
	return (
		<div className="mt-10">
			<h2 className="text-lg font-medium">Shipping Information</h2>
			<div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
				<ShippingCountry />
				<ShippingState />
				{inputProps.map(input => (
					<div key={input.id}>
						<Label htmlFor={input.id}>{input.label}</Label>
						<Input
							type={input.type}
							id={input.id}
							name={input.name}
							autoComplete={input.autoComplete}
							className={input.className}
							required={input.required}
							onChange={input.onChange}
							value={input.value}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
