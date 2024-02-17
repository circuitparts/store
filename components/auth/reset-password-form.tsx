"use client";
import { useHandleAuthError } from "@/components/auth/handle-auth-error";
import { ButtonWithSpinner } from "@/components/ui/button-with-spinner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { RESET_PASSWORD_STEP_2_PAGE } from "@/lib/constants/page-routes";
import { resetPasswordSchema } from "@/lib/schema/yup-schema";
import { useSignIn } from "@clerk/nextjs";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function ResetPasswordForm() {
	const router = useRouter();
	const [isLoading, startTransition] = useTransition();
	const handleAuthError = useHandleAuthError();

	const { isLoaded, signIn } = useSignIn();
	const { toast } = useToast();

	const initialValues = {
		email: "",
	};

	function handleOnSubmit(values: typeof initialValues) {
		startTransition(async () => {
			if (!isLoaded) return;

			try {
				const firstFactor = await signIn.create({
					strategy: "reset_password_email_code",
					identifier: values.email,
				});

				if (firstFactor.status === "needs_first_factor") {
					router.push(RESET_PASSWORD_STEP_2_PAGE);
					toast({
						variant: "default",
						title: "Check your email",
						description: "We sent you a 6-digit verification code.",
						duration: 4000,
					});
				}
			} catch (err: unknown) {
				handleAuthError(err, "SEND RESET PASSWORD CODE FAULT");
			}
		});
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={resetPasswordSchema}
			onSubmit={handleOnSubmit}>
			{({}) => (
				<Form className="space-y-3">
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Field
							as={Input}
							id="email"
							name="email"
							type="email"
							placeholder="name@domain.com"
							autoComplete="off"
							required
						/>
					</div>
					<ButtonWithSpinner
						isLoading={isLoading}
						label={"Send Verification Code"}
						type="submit"
						className="w-full"
					/>
				</Form>
			)}
		</Formik>
	);
}
