import { Features } from "@/components/home/features";
import { PcbInstantQuote } from "@/components/home/pcb-instant-quote";
import { SearchHint } from "@/components/home/search-hint";
import { SearchPartForm } from "@/components/home/search-part-form";
import { SubTitle } from "@/components/home/subtitle";
import { Title } from "@/components/home/title";
import UpcomingFeatures from "@/components/home/upcoming-features";
import { UploadBomLink } from "@/components/home/upload-bom-link";

export default async function Home() {
	return (
		<>
			<Title />
			<SubTitle />
			<SearchPartForm />
			<SearchHint />
			<UploadBomLink />
			<PcbInstantQuote />
			<Features />
			<UpcomingFeatures />
		</>
	);
}
