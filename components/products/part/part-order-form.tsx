"use client";
import { BackorderedComponentsTip } from "@/components/order-history/back-ordered-components-tip";
import { ButtonWithSpinner } from "@/components/ui/button-with-spinner";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { SEARCH_COMPONENTS_HELP_PAGE } from "@/lib/constants/page-routes";
import { partOrderSchema } from "@/lib/schema/yup-schema";
import { addItemToCartAction } from "@/lib/server-actions/cart-actions";
import { cn } from "@/lib/utils";
import type { PartDataType } from "@/types/part-types";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useTransition } from "react";

export function PartOrderForm({ partData }: { partData: PartDataType }) {
	const { Min, Availability, Name, Mult } = partData;
	const { toast } = useToast();
	const [isLoading, startTransition] = useTransition();

	const initialValues = {
		orderQty: Min,
	};

	const minOrderQty = parseInt(Min, 10);
	const multiple = parseInt(Mult, 10); // multiple of the minimum order quantity

	function handleOnSubmit(values: { orderQty: string }) {
		startTransition(async () => {
			const basketQty = parseInt(values.orderQty, 10);
			const cartItem: PartDataType = { ...partData, OrderedQty: basketQty };
			await addItemToCartAction(cartItem);
			toast({
				variant: "default",
				title: "Added to cart",
				description: `We've added ${Name} to your cart`,
				duration: 4000,
			});
		});
	}

	return (
		<div className="lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
			<Formik
				initialValues={initialValues}
				validationSchema={partOrderSchema(minOrderQty, multiple)}
				onSubmit={handleOnSubmit}>
				{({}) => (
					<Form>
						<div>
							<label
								htmlFor="orderQty"
								className="block text-sm font-medium leading-6">
								Enter Quantity:
							</label>
							<div className="relative mt-2 rounded-md">
								<Field
									as={Input}
									type="number"
									id="orderQty"
									name="orderQty"
									placeholder="Enter quantity"
									className="w-48"
									required
								/>
								<ErrorMessage
									name="orderQty"
									render={(msg: string) => <p className="text-red-600">{msg}</p>}
								/>
							</div>
						</div>
						<div className="mt-4">
							<ButtonWithSpinner
								isLoading={isLoading}
								label={"Add to Shopping Cart"}
								type="submit"
								className="w-full"
							/>
							<p className="mt-2 text-sm text-muted-foreground">
								Need help?{" "}
								<Link
									href={SEARCH_COMPONENTS_HELP_PAGE}
									target="_blank"
									className="underline">
									Learn How to order components
								</Link>
							</p>
							<div
								className={cn(
									"space-x-1 mt-1 justify-center",
									Availability.includes("In Stock") ? "hidden" : "flex"
								)}>
								<p className="font-semibold">Tip:</p>
								<p>This part is available for back-order</p>
								<BackorderedComponentsTip />
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
}
