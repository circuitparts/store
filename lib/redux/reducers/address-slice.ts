import { countriesAndStates } from "@/data/countries-and-states";
import { type ReduxState } from "@/lib/redux/store";
import type { AddressStoreStateType } from "@/types/address-types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: AddressStoreStateType = {
	billCountryOptions: countriesAndStates.map(country => country.name),
	billStateOptions: countriesAndStates[0].states.map(state => state.name),
	shipCountryOptions: countriesAndStates.map(country => country.name),
	shipStateOptions: countriesAndStates[0].states.map(state => state.name),
	billingAddress: {
		type: "Billing Address",
		firstName: "",
		lastName: "",
		address1: "",
		address2: "",
		city: "",
		state: "Badakhshan",
		country: "Afghanistan",
		postalCode: "",
		phone: "",
		email: "",
		company: "",
		taxId: "",
		po: "",
	},
	shippingAddress: {
		type: "Shipping Address",
		sameAsBilling: false,
		firstName: "",
		lastName: "",
		address1: "",
		address2: "",
		city: "",
		state: "Badakhshan",
		country: "Afghanistan",
		postalCode: "",
		phone: "",
		email: "",
		company: "",
	},
};

const addressSlice = createSlice({
	name: "address",
	initialState,
	reducers: {
		setBillingFirstName: (state, action: PayloadAction<string>) => {
			state.billingAddress.firstName = action.payload;
		},
		setBillingLastName: (state, action: PayloadAction<string>) => {
			state.billingAddress.lastName = action.payload;
		},
		setBillingAddress1: (state, action: PayloadAction<string>) => {
			state.billingAddress.address1 = action.payload;
		},
		setBillingAddress2: (state, action: PayloadAction<string>) => {
			state.billingAddress.address2 = action.payload;
		},
		setBillingCity: (state, action: PayloadAction<string>) => {
			state.billingAddress.city = action.payload;
		},
		setBillingState: (state, action: PayloadAction<string>) => {
			state.billingAddress.state = action.payload;
		},
		setBillingCountry: (state, action: PayloadAction<string>) => {
			state.billingAddress.country = action.payload;
			const selectedCountry = countriesAndStates.find(country => country.name === action.payload);
			state.billStateOptions = selectedCountry?.states ? selectedCountry.states.map(state => state.name) : [];
			state.billingAddress.state = state.billStateOptions[0] ?? "";
		},
		setBillingPostalCode: (state, action: PayloadAction<string>) => {
			state.billingAddress.postalCode = action.payload;
		},
		setBillingPhone: (state, action: PayloadAction<string>) => {
			state.billingAddress.phone = action.payload;
		},
		setBillingEmail: (state, action: PayloadAction<string>) => {
			state.billingAddress.email = action.payload;
		},
		setBillingCompany: (state, action: PayloadAction<string>) => {
			state.billingAddress.company = action.payload;
		},
		setBillingTaxId: (state, action: PayloadAction<string>) => {
			state.billingAddress.taxId = action.payload;
		},
		setBillingPo: (state, action: PayloadAction<string>) => {
			state.billingAddress.po = action.payload;
		},
		setShippingFirstName: (state, action: PayloadAction<string>) => {
			state.shippingAddress.firstName = action.payload;
		},
		setShippingLastName: (state, action: PayloadAction<string>) => {
			state.shippingAddress.lastName = action.payload;
		},
		setShippingAddress1: (state, action: PayloadAction<string>) => {
			state.shippingAddress.address1 = action.payload;
		},
		setShippingAddress2: (state, action: PayloadAction<string>) => {
			state.shippingAddress.address2 = action.payload;
		},
		setShippingCity: (state, action: PayloadAction<string>) => {
			state.shippingAddress.city = action.payload;
		},
		setShippingState: (state, action: PayloadAction<string>) => {
			state.shippingAddress.state = action.payload;
		},
		setShippingCountry: (state, action: PayloadAction<string>) => {
			state.shippingAddress.country = action.payload;
			const selectedCountry = countriesAndStates.find(country => country.name === action.payload);
			state.shipStateOptions = selectedCountry?.states ? selectedCountry.states.map(state => state.name) : [];
			state.shippingAddress.state = state.shipStateOptions[0] ?? "";
		},
		setShippingPostalCode: (state, action: PayloadAction<string>) => {
			state.shippingAddress.postalCode = action.payload;
		},
		setShippingPhone: (state, action: PayloadAction<string>) => {
			state.shippingAddress.phone = action.payload;
		},
		setShippingEmail: (state, action: PayloadAction<string>) => {
			state.shippingAddress.email = action.payload;
		},
		setShippingCompany: (state, action: PayloadAction<string>) => {
			state.shippingAddress.company = action.payload;
		},
		setShippingSameAsBilling: (state, action: PayloadAction<boolean>) => {
			state.shippingAddress.sameAsBilling = action.payload;
			// If same as billing, copy billing address to shipping address
			if (action.payload) {
				state.shippingAddress.firstName = state.billingAddress.firstName;
				state.shippingAddress.lastName = state.billingAddress.lastName;
				state.shippingAddress.address1 = state.billingAddress.address1;
				state.shippingAddress.address2 = state.billingAddress.address2;
				state.shippingAddress.city = state.billingAddress.city;
				state.shippingAddress.state = state.billingAddress.state;
				state.shippingAddress.country = state.billingAddress.country;
				state.shippingAddress.postalCode = state.billingAddress.postalCode;
				state.shippingAddress.phone = state.billingAddress.phone;
				state.shippingAddress.email = state.billingAddress.email;
				state.shippingAddress.company = state.billingAddress.company;
			}
		},
	},
});

export const {
	setBillingFirstName,
	setBillingLastName,
	setBillingAddress1,
	setBillingAddress2,
	setBillingCity,
	setBillingState,
	setBillingCountry,
	setBillingPostalCode,
	setBillingPhone,
	setBillingEmail,
	setBillingCompany,
	setBillingTaxId,
	setBillingPo,
	setShippingFirstName,
	setShippingLastName,
	setShippingAddress1,
	setShippingAddress2,
	setShippingCity,
	setShippingState,
	setShippingCountry,
	setShippingPostalCode,
	setShippingPhone,
	setShippingEmail,
	setShippingCompany,
	setShippingSameAsBilling,
} = addressSlice.actions;
export default addressSlice.reducer;

/* Selectors */
export const selectBillingAddress = (state: ReduxState) => state.address.billingAddress;
export const selectShippingAddress = (state: ReduxState) => state.address.shippingAddress;
export const selectBillCountryOptions = (state: ReduxState) => state.address.billCountryOptions;
export const selectBillStateOptions = (state: ReduxState) => state.address.billStateOptions;
export const selectShipCountryOptions = (state: ReduxState) => state.address.shipCountryOptions;
export const selectShipStateOptions = (state: ReduxState) => state.address.shipStateOptions;
export const selectShippingSameAsBilling = (state: ReduxState) => state.address.shippingAddress.sameAsBilling;
