"use client";
import { CurrentPasswordInput, NewPasswordInput } from "@/components/account/account-input-fields";
import { ChangePasswordHeading } from "@/components/account/change-password-heading";
import { useHandleAuthError } from "@/components/auth/handle-auth-error";
import { ButtonWithSpinner } from "@/components/ui/button-with-spinner";
import { useToast } from "@/components/ui/use-toast";
import { updateAccountSchema } from "@/lib/schema/yup-schema";
import { useUser } from "@clerk/nextjs";
import { Form, Formik } from "formik";
import { useTransition } from "react";

export function ChangePasswordForm() {
	const { user } = useUser();
	const { toast } = useToast();
	const [isLoading, startTransition] = useTransition();
	const handleAuthError = useHandleAuthError();

	const initialValues = {
		currentPassword: "",
		newPassword: "",
	};

	function handleOnSubmit(values: typeof initialValues) {
		startTransition(async () => {
			const { newPassword, currentPassword } = values;

			if (!newPassword.trim() || !currentPassword.trim()) {
				toast({
					variant: "destructive",
					title: "Empty Password",
					description: "Please enter your password to change it.",
					duration: 4000,
				});
				return;
			}

			if (!user) return;

			try {
				await user.updatePassword({
					currentPassword,
					newPassword,
				});
				await user.reload();
			} catch (err: unknown) {
				handleAuthError(err, "PASSWORD CHANGE FAULT");
			}
		});
	}

	return (
		<>
			<ChangePasswordHeading />
			<Formik
				initialValues={initialValues}
				validationSchema={updateAccountSchema}
				onSubmit={handleOnSubmit}>
				{({}) => (
					<Form className="w-full space-y-4">
						<CurrentPasswordInput />
						<NewPasswordInput />
						<ButtonWithSpinner
							isLoading={isLoading}
							label={"Change Password"}
							type="submit"
							className="w-full"
						/>
					</Form>
				)}
			</Formik>
		</>
	);
}
