import { NRF52832_DETAILS_PAGE_URL, STM32MP1_RESULTS_PAGE_URL } from "@/lib/constants/page-routes";
import Link from "next/link";

export function SearchHint() {
	return (
		<p className="text-center text-sm pb-2">
			Try a partial search like{" "}
			<Link
				className="underline"
				href={STM32MP1_RESULTS_PAGE_URL}>
				STM32MP1
			</Link>{" "}
			or an exact search like{" "}
			<Link
				className="underline"
				href={NRF52832_DETAILS_PAGE_URL}>
				NRF52832-QFAA-R7
			</Link>
		</p>
	);
}
