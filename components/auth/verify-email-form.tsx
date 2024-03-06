"use client";
import { useHandleAuthError } from "@/components/auth/handle-auth-error";
import { ButtonWithSpinner } from "@/components/ui/button-with-spinner";
import { HOME_PAGE, SIGNUP_NOTIFICATION_EMAIL_ENDPOINT } from "@/lib/constants/page-routes";
import { verifyEmailSchema } from "@/lib/schema/yup-schema";
import { captureUserSignupAction } from "@/lib/server-actions/cart-actions";
import { useSignUp } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CONSOLE_RED_TEXT } from "@/lib/constants/app";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import type { ClerkSignupDataType } from "@/types/clerk-types";

export function VerifyEmailForm() {
	const { isLoaded, signUp, setActive } = useSignUp();
	const router = useRouter();
	const [isLoading, startTransition] = useTransition();
	const handleAuthError = useHandleAuthError();

	const initialValues = {
		code: "",
	};

	async function handleOnSubmit(values: typeof initialValues) {
		startTransition(async () => {
			if (!isLoaded) return;

			try {
				const completeSignUp = await signUp.attemptEmailAddressVerification({
					code: values.code,
				});

				if (completeSignUp.status !== "complete") {
					console.error(CONSOLE_RED_TEXT, `VERIFY EMAIL FAULT => ${JSON.stringify(completeSignUp, null, 2)}`);
					return;
				}

				await setActive({
					session: completeSignUp.createdSessionId,
				});

				if (
					!completeSignUp.firstName ||
					!completeSignUp.lastName ||
					!completeSignUp.emailAddress ||
					!completeSignUp.createdUserId
				) {
					console.error(CONSOLE_RED_TEXT, `VERIFY EMAIL FAULT => ${JSON.stringify(completeSignUp, null, 2)}`);
					return;
				}

				const signupData: ClerkSignupDataType = {
					firstName: completeSignUp.firstName,
					lastName: completeSignUp.lastName,
					email: completeSignUp.emailAddress,
					userId: completeSignUp.createdUserId,
				};

				//TODO: send signup email
				const signupEmail = await fetch(SIGNUP_NOTIFICATION_EMAIL_ENDPOINT, {
					method: "POST",
					body: JSON.stringify(signupData),
				});

				if (!signupEmail.ok) {
					console.error(CONSOLE_RED_TEXT, `SIGNUP EMAIL FAULT => ${JSON.stringify(signupEmail, null, 2)}`);
				}

				try {
					await captureUserSignupAction(signupData);
				} catch (err) {
					handleAuthError(err, "SIGNUP ACTION FAULT");
					return;
				}

				router.push(HOME_PAGE);
			} catch (err: unknown) {
				handleAuthError(err, "VERIFY EMAIL FAULT");
			}
		});
	}

	async function handleResendBtnClick() {
		startTransition(async () => {
			if (!isLoaded) return;
			await signUp.prepareEmailAddressVerification({
				strategy: "email_code",
			});
		});
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={verifyEmailSchema}
			onSubmit={handleOnSubmit}>
			{({}) => (
				<Form className="space-y-2">
					<div className="grid gap-2">
						<Field
							data-testid="verify-email-code-input"
							as={Input}
							id="code"
							name="code"
							type="text"
							autoComplete="off"
							formNoValidate
							required
							pattern="\d{6}"
							placeholder="6-digit verification code"
						/>
					</div>
					<ButtonWithSpinner
						data-testid="verify-email-submit-button"
						className="w-full"
						isLoading={isLoading}
						label={"Verify Email"}
						type="submit"
					/>
					<div className="mt-2">
						<span className="text-sm">Did&apos;t receive code?</span>
						<Button
							disabled={isLoading}
							onClick={() => handleResendBtnClick()}
							className="-ml-3"
							variant={"link"}>
							Resend
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
}
