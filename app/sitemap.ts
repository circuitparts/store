import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: "https://circuitparts.in",
			lastModified: "2024-02-18T00:29:15.456Z",
			changeFrequency: "monthly",
			priority: 1,
		},
		{
			url: "https://circuitparts.in/shipping-and-returns",
			lastModified: "2024-02-18T00:29:15.456Z",
			changeFrequency: "yearly",
			priority: 0.8,
		},
		{
			url: "https://circuitparts.in/terms-and-conditions",
			lastModified: "2024-02-18T00:29:15.456Z",
			changeFrequency: "yearly",
			priority: 0.8,
		},
		{
			url: "https://circuitparts.in/privacy-policy",
			lastModified: "2024-02-18T00:29:15.456Z",
			changeFrequency: "yearly",
			priority: 0.8,
		},
		{
			url: "https://circuitparts.in/contact-us",
			lastModified: "2024-02-18T00:29:15.456Z",
			changeFrequency: "yearly",
			priority: 0.8,
		},
	];
}
