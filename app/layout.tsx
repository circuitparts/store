import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Container } from "@/components/ui/container";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/auth-context";
import { CurrencyProvider } from "@/context/currency-context";
import { ReduxProvider } from "@/context/redux-context";
import { BASE_APP_URL } from "@/lib/constants/app";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	metadataBase: new URL(BASE_APP_URL),
	title: "Circuit Parts | Open-source E-Commerce shopping platform for embedded electronics",
	description: "Open-source E-Commerce shopping platform for embedded electronics",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
	authors: [
		{
			name: "deepak-jdr",
			url: "https://www.consolelogs.in",
		},
	],
	creator: "Circuit Parts",
	openGraph: {
		title: "Circuit Parts | Open-source E-Commerce shopping platform for embedded electronics",
		description: "Open-source E-Commerce shopping platform for embedded electronics",
		url: "https://www.circuitparts.in",
		locale: "en_US",
		siteName: "Circuit Parts",
		type: "website",
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<html
				lang="en"
				className="h-full">
				<body className={inter.className}>
					<AuthProvider>
						<CurrencyProvider>
							<ReduxProvider>
								<Header />
								<Container>{children}</Container>
							</ReduxProvider>
							<Footer />
						</CurrencyProvider>
					</AuthProvider>
					<Toaster />
					<Analytics />
				</body>
			</html>
		</ClerkProvider>
	);
}
