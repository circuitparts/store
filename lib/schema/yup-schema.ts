import {
	ADDRESS_MATCH_ERROR,
	EMPTY_ADDRESS_ERROR,
	EMPTY_CITY_ERROR,
	EMPTY_CODE_ERROR,
	EMPTY_COUNTRY_ERROR,
	EMPTY_FIRST_NAME_ERROR,
	EMPTY_LASTNAME_ERROR,
	EMPTY_PHONE_NUM_ERROR,
	EMPTY_POSTALCODE_ERROR,
	EMPTY_QUANTITY_ERROR,
	EMPTY_STATE_ERROR,
	INVALID_CODE_ERROR,
	INVALID_EMAIL_ERROR,
	NO_SEARCH_INPUT_ERROR,
	PASSWORD_VALIDATION_ERROR,
	PHONE_NUM_VALIDATION_ERROR,
	POSTAL_CODE_ERROR,
} from "@/lib/constants/error-messages";
import * as Yup from "yup";

export const searchPartSchema = Yup.object().shape({
	query: Yup.string().required(NO_SEARCH_INPUT_ERROR),
});

export const loginSchema = Yup.object().shape({
	email: Yup.string()
		.email(INVALID_EMAIL_ERROR)
		.required(INVALID_EMAIL_ERROR)
		.matches(/@[^.]*\./, INVALID_EMAIL_ERROR)
		.matches(/^\S+$/, INVALID_EMAIL_ERROR),
	password: Yup.string().required(PASSWORD_VALIDATION_ERROR),
});

export const resetPasswordSchema = Yup.object().shape({
	email: Yup.string()
		.email(INVALID_EMAIL_ERROR)
		.required(INVALID_EMAIL_ERROR)
		.matches(/@[^.]*\./, INVALID_EMAIL_ERROR)
		.matches(/^\S+$/, INVALID_EMAIL_ERROR),
});

export const resetPassword2Schema = Yup.object().shape({
	code: Yup.string().required(EMPTY_CODE_ERROR).min(6, INVALID_CODE_ERROR).max(6, INVALID_CODE_ERROR),
	newPassword: Yup.string()
		.required(PASSWORD_VALIDATION_ERROR)
		.matches(/(?=.*[a-z])/, PASSWORD_VALIDATION_ERROR)
		.matches(/(?=.*[A-Z])/, PASSWORD_VALIDATION_ERROR)
		.matches(/(?=.*[0-9])/, PASSWORD_VALIDATION_ERROR)
		.matches(/(?=.*[!@#\$%\^&\*\?])/, PASSWORD_VALIDATION_ERROR)
		.min(8, PASSWORD_VALIDATION_ERROR),
});

export const signupSchema = Yup.object().shape({
	fname: Yup.string().required(EMPTY_FIRST_NAME_ERROR),
	lname: Yup.string().required(EMPTY_LASTNAME_ERROR),
	email: Yup.string()
		.email(INVALID_EMAIL_ERROR)
		.required(INVALID_EMAIL_ERROR)
		.matches(/@[^.]*\./, INVALID_EMAIL_ERROR)
		.matches(/^\S+$/, INVALID_EMAIL_ERROR),
	password: Yup.string()
		.required(PASSWORD_VALIDATION_ERROR)
		.matches(/(?=.*[a-z])/, PASSWORD_VALIDATION_ERROR)
		.matches(/(?=.*[A-Z])/, PASSWORD_VALIDATION_ERROR)
		.matches(/(?=.*[0-9])/, PASSWORD_VALIDATION_ERROR)
		.matches(/(?=.*[!@#\$%\^&\*\?])/, PASSWORD_VALIDATION_ERROR)
		.min(8, PASSWORD_VALIDATION_ERROR),
});

export const verifyEmailSchema = Yup.object().shape({
	code: Yup.string()
		.matches(/^\d{6}$/, INVALID_CODE_ERROR)
		.required(EMPTY_CODE_ERROR),
});

export const updatePartQtySchema = (minOrderQty: number, multiple: number) =>
	Yup.object().shape({
		orderQty: Yup.number()
			.positive()
			.required(EMPTY_QUANTITY_ERROR)
			.min(minOrderQty, `Quantity cannot be less than ${minOrderQty}`)
			.test("is-multiple", `Quantity must be in multiples of ${multiple}`, value => value % multiple === 0),
	});

export const partOrderSchema = (minOrderQty: number, multiple: number) =>
	Yup.object().shape({
		orderQty: Yup.number()
			.positive()
			.required("Quantity cannot be empty")
			.min(minOrderQty, `Quantity cannot be less than min order quantity [Minimum: ${minOrderQty}]`)
			.test("is-multiple", `Quantity must be in multiples of ${multiple}`, value => value % multiple === 0),
	});

export const addressSchema = (isSameAddress: boolean) =>
	Yup.object().shape({
		bill_fname: Yup.string().required(EMPTY_FIRST_NAME_ERROR),
		bill_lname: Yup.string().required(EMPTY_LASTNAME_ERROR),
		bill_company: Yup.string().optional(),
		bill_address1: Yup.string().required(EMPTY_ADDRESS_ERROR),
		bill_address2: Yup.string().optional(),
		bill_city: Yup.string().required(EMPTY_CITY_ERROR),
		bill_state: Yup.string().required(EMPTY_STATE_ERROR),
		bill_country: Yup.string().required(EMPTY_COUNTRY_ERROR),
		bill_postalCode: Yup.string()
			.required(EMPTY_POSTALCODE_ERROR)
			.min(6, POSTAL_CODE_ERROR)
			.max(6, POSTAL_CODE_ERROR),
		bill_email: Yup.string()
			.email(INVALID_EMAIL_ERROR)
			.required(INVALID_EMAIL_ERROR)
			.matches(/@[^.]*\./, INVALID_EMAIL_ERROR)
			.matches(/^\S+$/, INVALID_EMAIL_ERROR),
		bill_phone: Yup.string()
			.required(EMPTY_PHONE_NUM_ERROR)
			.min(10, PHONE_NUM_VALIDATION_ERROR)
			.max(10, PHONE_NUM_VALIDATION_ERROR),
		bill_gst: Yup.string().optional(),
		bill_poNumber: Yup.string().optional(),

		bill_ship_match: Yup.boolean().required(ADDRESS_MATCH_ERROR),

		...(!isSameAddress && {
			ship_fname: Yup.string().required(EMPTY_FIRST_NAME_ERROR),
			ship_lname: Yup.string().required(EMPTY_LASTNAME_ERROR),
			ship_company: Yup.string().optional(),
			ship_address1: Yup.string().required(EMPTY_ADDRESS_ERROR),
			ship_address2: Yup.string().optional(),
			ship_city: Yup.string().required(EMPTY_CITY_ERROR),
			ship_state: Yup.string().required(EMPTY_STATE_ERROR),
			ship_country: Yup.string().required(EMPTY_COUNTRY_ERROR),
			ship_postalCode: Yup.string()
				.required(EMPTY_POSTALCODE_ERROR)
				.min(6, POSTAL_CODE_ERROR)
				.max(6, POSTAL_CODE_ERROR),
			ship_email: Yup.string()
				.email(INVALID_EMAIL_ERROR)
				.required(INVALID_EMAIL_ERROR)
				.matches(/@[^.]*\./, INVALID_EMAIL_ERROR)
				.matches(/^\S+$/, INVALID_EMAIL_ERROR),
			ship_phone: Yup.string()
				.required(EMPTY_PHONE_NUM_ERROR)
				.min(10, PHONE_NUM_VALIDATION_ERROR)
				.max(10, PHONE_NUM_VALIDATION_ERROR),
		}),
	});

export const updateAccountSchema = Yup.object().shape({
	fname: Yup.string().required("First name is required"),
	lname: Yup.string().required("Last name is required"),
	c_password: Yup.string(),
	n_password: Yup.string()
		.matches(/(?=.*[a-z])/, PASSWORD_VALIDATION_ERROR)
		.matches(/(?=.*[A-Z])/, PASSWORD_VALIDATION_ERROR)
		.matches(/(?=.*[0-9])/, PASSWORD_VALIDATION_ERROR)
		.matches(/(?=.*[!@#\$%\^&\*\?])/, PASSWORD_VALIDATION_ERROR)
		.min(8, PASSWORD_VALIDATION_ERROR),
});
