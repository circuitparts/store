export default function SavedProjectDetailsPage({ params: { slug } }: { params: { slug: string } }) {
	const projectName = decodeURIComponent(slug);
	return <h1>{projectName}</h1>;
}
