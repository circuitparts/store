import React from "react";
import type { DocsThemeConfig } from "nextra-theme-docs";
import Image from "next/image";
import { PLATFORM_NAME } from "@/lib/constants/app";
import logo from "@/public/images/logo.png";

const config: DocsThemeConfig = {
	logo: (
		<div style={{ display: "flex" }}>
			<Image
				src={logo}
				alt="Logo"
				height={20}
				width={20}
			/>
			<p
				style={{
					fontWeight: "bold",
					marginLeft: "0.5rem",
				}}>
				{PLATFORM_NAME} Developer Documentation
			</p>
		</div>
	),
	project: {
		link: "https://github.com/circuitparts/store",
	},
	chat: {
		link: "https://discord.gg/B4CCqBEH",
	},
	darkMode: false,
	docsRepositoryBase: "https://github.com/circuitparts/store/tree/main/pages",
	footer: {
		text: (
			<span>
				© {new Date().getFullYear()}{" "}
				<a
					href="https://www.circuitparts.in"
					target="_blank">
					Circuit Parts
				</a>
				.
			</span>
		),
	},
};

export default config;
