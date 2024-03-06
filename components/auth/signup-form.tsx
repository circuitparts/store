"use client";
import { useHandleAuthError } from "@/components/auth/handle-auth-error";
import { ButtonWithSpinner } from "@/components/ui/button-with-spinner";
import { ShowPasswordButton } from "@/components/ui/show-password-button";
import { VERIFY_EMAIL_PAGE } from "@/lib/constants/page-routes";
import { signupSchema } from "@/lib/schema/yup-schema";
import { useSignUp } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export function SignupForm() {
	const router = useRouter();
	const { isLoaded, signUp } = useSignUp();
	const [isLoading, startTransition] = useTransition();
	const handleAuthError = useHandleAuthError();
	const [isPasswordVisible, setIsShowPassword] = useState(false);

	const initialValues = {
		fname: "",
		lname: "",
		email: "",
		password: "",
	};

	function handleOnSubmit(signupCredentials: typeof initialValues) {
		startTransition(async () => {
			if (!isLoaded) return;
			try {
				await signUp.create({
					emailAddress: signupCredentials.email,
					password: signupCredentials.password,
					firstName: signupCredentials.fname,
					lastName: signupCredentials.lname,
				});
				// Send email verification code
				await signUp.prepareEmailAddressVerification({
					strategy: "email_code",
				});
				router.push(VERIFY_EMAIL_PAGE);
			} catch (err: unknown) {
				handleAuthError(err, "SIGNUP FAULT");
			}
		});
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={signupSchema}
			onSubmit={handleOnSubmit}>
			{({}) => (
				<Form className="space-y-3">
					<div className="grid gap-2">
						<Label htmlFor="fname">First Name</Label>
						<Field
							data-testid="fname-input"
							as={Input}
							id="fname"
							name="fname"
							placeholder="enter your first name"
							type="text"
							autoComplete="off"
							formNoValidate
							required
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="lname">Last Name</Label>
						<Field
							data-testid="lname-input"
							as={Input}
							id="lname"
							name="lname"
							placeholder="enter your last name"
							type="text"
							autoComplete="off"
							formNoValidate
							required
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Field
							data-testid="email-input"
							as={Input}
							id="email"
							name="email"
							type="email"
							placeholder="name@domain.com"
							autoComplete="off"
							required
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="password">Password</Label>
						<div className="relative">
							<Field
								data-testid="password-input"
								as={Input}
								id="password"
								name="password"
								type={isPasswordVisible ? "text" : "password"}
								placeholder="enter your password"
								autoComplete="off"
								formNoValidate
								required
							/>
							<ShowPasswordButton
								isPasswordVisible={isPasswordVisible}
								setIsPasswordVisible={setIsShowPassword}
							/>
						</div>
					</div>
					<ButtonWithSpinner
						data-testid="create-account-button"
						isLoading={isLoading}
						label={"Create Account"}
						type="submit"
						className="w-full"
					/>
				</Form>
			)}
		</Formik>
	);
}
