"use client";
import { SearchInput } from "@/components/home/search-input";
import { ButtonWithSpinner } from "@/components/ui/button-with-spinner";
import { PART_RESULTS_PAGE } from "@/lib/constants/page-routes";
import { searchPartSchema } from "@/lib/schema/yup-schema";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function SearchPartForm() {
	const router = useRouter();
	const [isLoading, startTransition] = useTransition();

	const initialValues = {
		query: "",
	};

	function handleOnSubmit(values: typeof initialValues) {
		startTransition(() => {
			router.push(PART_RESULTS_PAGE + encodeURI(values.query.toUpperCase()));
		});
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={searchPartSchema}
			onSubmit={handleOnSubmit}>
			{({}) => (
				<Form className="flex flex-1">
					<div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
						<div className="flex justify-center space-x-2 px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
							<div className="w-full lg:w-2/5">
								<SearchInput />
							</div>
							<ButtonWithSpinner
								data-testid="search-component-button"
								isLoading={isLoading}
								label={"Search"}
							/>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
}
