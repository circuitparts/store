import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field } from "formik";

export function SearchInput() {
	return (
		<>
			<Label className="sr-only">Search</Label>
			<Field
				as={Input}
				autoComplete="off"
				name="query"
				className="w-full"
				placeholder="search components by part number, keywords or tech specs"
				type="text"
				formNoValidate
				required
			/>
		</>
	);
}
