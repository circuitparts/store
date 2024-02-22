/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const withNextra = require("nextra")({
	theme: "nextra-theme-docs",
	themeConfig: "./pages/_theme.config.tsx",
});

module.exports = withNextra();
