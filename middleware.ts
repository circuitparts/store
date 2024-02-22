import { AUTH_PAGES } from "@/lib/constants/page-routes";
import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const privateRoutes = ["account", "checkout", "order-history", "order-status"];
const publicRoutesRegExp = new RegExp(`^(?!\/(${privateRoutes.join("|")})).*$`); // Matches any route that doesn't start with /account, /checkout, /order-history, or /order-status

export default authMiddleware({
	// Public routes are routes that don't require authentication
	publicRoutes: [publicRoutesRegExp],
	afterAuth(auth, req) {
		// redirect to login who aren't authenticated
		if (!auth.userId && !auth.isPublicRoute) {
			const login = new URL("/auth/login", req.url);
			return NextResponse.redirect(login);
		}
		if (auth.userId && req.url.includes(AUTH_PAGES)) {
			// redirect to home if already authenticated
			const home = new URL("/", req.url);
			return NextResponse.redirect(home);
		}
	},
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api)(.*)"],
};
