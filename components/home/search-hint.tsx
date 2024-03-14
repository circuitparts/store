import { SEARCH_COMPONENTS_HELP_PAGE, STM32MP1_RESULTS_PAGE_URL } from "@/lib/constants/page-routes";
import Link from "next/link";

export function SearchHint() {
	return (
		<p className="text-center text-sm pb-2">
			Try an example search:{" "}
			<Link
				className="underline"
				href={STM32MP1_RESULTS_PAGE_URL}>
				STM32MP1
			</Link>{" "}
			Need help?{" "}
			<Link
				className="underline"
				href={SEARCH_COMPONENTS_HELP_PAGE}>
				Learn How to Search
			</Link>
		</p>
	);
}
