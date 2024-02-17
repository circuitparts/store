import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShowPasswordButton } from "@/components/ui/show-password-button";
import { Field } from "formik";
import { useState } from "react";

export function CurrentPasswordInput() {
	const [isPasswordVisible, setIsShowPassword] = useState(false);
	return (
		<>
			<div className="grid gap-2">
				<Label htmlFor="currentPassword">Current Password</Label>
				<div className="relative">
					<Field
						as={Input}
						id="currentPassword"
						name="currentPassword"
						type={isPasswordVisible ? "text" : "password"}
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
		</>
	);
}

export function NewPasswordInput() {
	const [isPasswordVisible, setIsShowPassword] = useState(false);
	return (
		<>
			<div className="grid gap-2">
				<Label htmlFor="newPassword">New Password</Label>
				<div className="relative">
					<Field
						as={Input}
						id="newPassword"
						name="newPassword"
						type={isPasswordVisible ? "text" : "password"}
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
		</>
	);
}
