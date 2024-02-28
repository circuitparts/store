"use client";
import { useHandleAuthError } from "@/components/auth/handle-auth-error";
import { ButtonWithSpinner } from "@/components/ui/button-with-spinner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShowPasswordButton } from "@/components/ui/show-password-button";
import { CONSOLE_RED_TEXT } from "@/lib/constants/app";
import { HOME_PAGE } from "@/lib/constants/page-routes";
import { loginSchema } from "@/lib/schema/yup-schema";
import { transferGuestCartToUserAction } from "@/lib/server-actions/cart-actions";
import { useSignIn } from "@clerk/nextjs";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export function LoginForm() {
	const [isLoading, startTransition] = useTransition();
	const [isPasswordVisible, setIsShowPassword] = useState(false);
	const { isLoaded, signIn, setActive } = useSignIn();
	const router = useRouter();
	const handleAuthError = useHandleAuthError();

	const initialValues = {
		email: "",
		password: "",
	};

	function handleOnSubmit(loginCredentials: typeof initialValues) {
		startTransition(async () => {
			if (!isLoaded) return;
			try {
				const result = await signIn.create({
					identifier: loginCredentials.email,
					password: loginCredentials.password,
				});
				if (result.status !== "complete") {
					console.error(CONSOLE_RED_TEXT, `LOGIN FAULT => ${JSON.stringify(result)}`);
					return;
				}
				await setActive({ session: result.createdSessionId });
				await transferGuestCartToUserAction();
				router.push(HOME_PAGE);
			} catch (err: unknown) {
				handleAuthError(err, "LOGIN FAULT");
			}
		});
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={loginSchema}
			onSubmit={handleOnSubmit}>
			{({}) => (
				<Form className="space-y-3">
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
								autoComplete="off"
								placeholder="enter your password"
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
						data-testid="sign-in-button"
						isLoading={isLoading}
						label={"Sign In"}
						type="submit"
						className="w-full"
					/>
				</Form>
			)}
		</Formik>
	);
}
