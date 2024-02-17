"use client";
import { useHandleAuthError } from "@/components/auth/handle-auth-error";
import { ButtonWithSpinner } from "@/components/ui/button-with-spinner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { resetPassword2Schema } from "@/lib/schema/yup-schema";
import { useSignIn } from "@clerk/nextjs";
import { Field, Form, Formik } from "formik";
import { useState, useTransition } from "react";

export function ResetPasswordForm2() {
	const [isLoading, startTransition] = useTransition();
	const { isLoaded, signIn, setActive } = useSignIn();
	const [isCompleted, setIsCompleted] = useState(false);
	const { toast } = useToast();
	const handleAuthError = useHandleAuthError();

	const initialValues = {
		code: "",
		newPassword: "",
	};

	function handleOnSubmit(values: typeof initialValues) {
		startTransition(async () => {
			if (!isLoaded) return;

			try {
				const attemptFirstFactor = await signIn.attemptFirstFactor({
					strategy: "reset_password_email_code",
					code: values.code,
					password: values.newPassword,
				});
				if (attemptFirstFactor.status === "needs_second_factor") {
					//TODO: implement 2FA (requires clerk pro plan)
				} else if (attemptFirstFactor.status === "complete") {
					await setActive({
						session: attemptFirstFactor.createdSessionId,
					});
					setIsCompleted(true);
					toast({
						variant: "default",
						title: "Password Reset Successful",
						description: "Your password has been reset successfully.",
					});
				} else {
					toast({
						variant: "destructive",
						title: "Password Reset Error",
						description: "Something went wrong",
						duration: 4000,
					});
				}
			} catch (err: unknown) {
				handleAuthError(err, "RESET PASSWORD CODE VALIDATION FAULT");
			}
		});
	}

	if (isCompleted) {
		return (
			<div>
				<p className="my-4">You successfully changed you password.</p>
			</div>
		);
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={resetPassword2Schema}
			onSubmit={handleOnSubmit}>
			{({}) => (
				<Form className="space-y-4">
					<div className="grid gap-2">
						<Label htmlFor="code">Verification Code</Label>
						<Field
							as={Input}
							id="code"
							name="code"
							type="number"
							autoComplete="off"
							formNoValidate
							required
							placeholder="6-digit verification code"
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="newPassword">New password</Label>
						<Field
							as={Input}
							id="newPassword"
							name="newPassword"
							type="password"
							autoComplete="off"
							formNoValidate
							required
							placeholder="enter your new password"
						/>
					</div>
					<ButtonWithSpinner
						isLoading={isLoading}
						label={"Reset Password"}
						type="submit"
						className="w-full"
					/>
				</Form>
			)}
		</Formik>
	);
}
