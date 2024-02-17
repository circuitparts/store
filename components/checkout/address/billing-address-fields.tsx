import { BillingCountry } from "@/components/checkout/address/bill-country";
import { BillingState } from "@/components/checkout/address/bill-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	selectBillingAddress,
	setBillingAddress1,
	setBillingAddress2,
	setBillingCity,
	setBillingCompany,
	setBillingEmail,
	setBillingFirstName,
	setBillingLastName,
	setBillingPhone,
	setBillingPo,
	setBillingPostalCode,
	setBillingTaxId,
} from "@/lib/redux/reducers/address-slice";
import type { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

export function BillingAddressFields() {
	const dispatch = useDispatch();
	const billingAddress = useSelector(selectBillingAddress);
	const inputFieldProps = [
		{
			label: "Postal code *",
			type: "number",
			id: "bill_postalCode",
			name: "bill_postalCode",
			autoComplete: "off",
			className: "w-full",
			required: true,
			value: billingAddress.postalCode,
			onChange: (e: ChangeEvent<HTMLInputElement>) => dispatch(setBillingPostalCode(e.target.value)),
		},
		{
			label: "City *",
			type: "text",
			id: "bill_city",
			name: "bill_city",
			autoComplete: "off",
			className: "w-full",
			required: true,
			value: billingAddress.city,
			onChange: (e: ChangeEvent<HTMLInputElement>) => dispatch(setBillingCity(e.target.value)),
		},
		{
			label: "Address Line 1 *",
			type: "text",
			id: "bill_address1",
			name: "bill_address1",
			autoComplete: "off",
			className: "w-full",
			required: true,
			value: billingAddress.address1,
			onChange: (e: ChangeEvent<HTMLInputElement>) => dispatch(setBillingAddress1(e.target.value)),
		},
		{
			label: "Address Line 2",
			type: "text",
			id: "bill_address2",
			name: "bill_address2",
			autoComplete: "off",
			className: "w-full",
			required: false,
			value: billingAddress.address2,
			onChange: (e: ChangeEvent<HTMLInputElement>) => dispatch(setBillingAddress2(e.target.value)),
		},
		{
			label: "Company",
			type: "text",
			id: "bill_company",
			name: "bill_company",
			autoComplete: "off",
			className: "w-full",
			required: false,
			value: billingAddress.company,
			onChange: (e: ChangeEvent<HTMLInputElement>) => dispatch(setBillingCompany(e.target.value)),
		},
		{
			label: "Tax ID / VAT / GST",
			type: "text",
			id: "bill_gst",
			name: "bill_gst",
			autoComplete: "off",
			className: "w-full",
			required: false,
			value: billingAddress.taxId,
			onChange: (e: ChangeEvent<HTMLInputElement>) => dispatch(setBillingTaxId(e.target.value)),
		},
		{
			label: "Purchase Order",
			type: "text",
			id: "bill_poNumber",
			name: "bill_poNumber",
			autoComplete: "off",
			className: "w-full",
			required: false,
			value: billingAddress.po,
			onChange: (e: ChangeEvent<HTMLInputElement>) => dispatch(setBillingPo(e.target.value)),
		},
		{
			label: "Email *",
			type: "email",
			id: "bill_email",
			name: "bill_email",
			autoComplete: "off",
			className: "w-full",
			required: true,
			value: billingAddress.email,
			onChange: (e: ChangeEvent<HTMLInputElement>) => dispatch(setBillingEmail(e.target.value)),
		},
		{
			label: "First Name *",
			type: "text",
			id: "bill_fname",
			name: "bill_fname",
			autoComplete: "off",
			className: "w-full",
			required: true,
			value: billingAddress.firstName,
			onChange: (e: ChangeEvent<HTMLInputElement>) => dispatch(setBillingFirstName(e.target.value)),
		},
		{
			label: "Last Name *",
			type: "text",
			id: "bill_lname",
			name: "bill_lname",
			autoComplete: "off",
			className: "w-full",
			required: true,
			value: billingAddress.lastName,
			onChange: (e: ChangeEvent<HTMLInputElement>) => dispatch(setBillingLastName(e.target.value)),
		},
		{
			label: "Phone *",
			type: "number",
			id: "bill_phone",
			name: "bill_phone",
			autoComplete: "off",
			className: "w-full",
			required: true,
			value: billingAddress.phone,
			onChange: (e: ChangeEvent<HTMLInputElement>) => dispatch(setBillingPhone(e.target.value)),
		},
	];

	return (
		<div className="mt-10">
			<h2 className="text-lg font-medium">Billing Information</h2>
			<div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
				<BillingCountry />
				<BillingState />
				{inputFieldProps.map(input => (
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
