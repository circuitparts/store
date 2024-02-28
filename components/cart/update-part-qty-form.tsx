"use client";
import { ButtonWithSpinner } from "@/components/ui/button-with-spinner";
import { Input } from "@/components/ui/input";
import { updatePartQtySchema } from "@/lib/schema/yup-schema";
import { updatePartQtyAction } from "@/lib/server-actions/cart-actions";
import type { PartDataType } from "@/types/part-types";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useTransition } from "react";

export function UpdatePartQuantityForm(props: { part: PartDataType }) {
	const [isLoading, startTransition] = useTransition();
	const { part } = props;
	const { Name, OrderedQty, Min, Mult } = part;

	const initialValues = {
		orderQty: OrderedQty,
	};

	const minOrderQty = parseInt(Min, 10);
	const multiple = parseInt(Mult, 10); // multiple of the minimum order quantity

	function handleOnSubmit(values: typeof initialValues) {
		startTransition(async () => {
			await updatePartQtyAction({ name: Name, newQty: values.orderQty });
		});
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={updatePartQtySchema(minOrderQty, multiple)}
			onSubmit={handleOnSubmit}>
			{({}) => (
				<Form>
					<div className="flex items-center space-x-2 w-3/4 md:w-5/12 lg:w-full">
						<Field
							data-testid="update-part-qty-input"
							as={Input}
							type="number"
							name="orderQty"
							className="py-1"
							placeholder="Enter Quantity"
						/>
						<ButtonWithSpinner
							data-testid="update-part-qty-button"
							isLoading={isLoading}
							label="Update"
							type="submit"
							size="sm"
						/>
					</div>
					<ErrorMessage
						name="orderQty"
						render={(msg: string) => <p className="text-red-600">{msg}</p>}
					/>
				</Form>
			)}
		</Formik>
	);
}
