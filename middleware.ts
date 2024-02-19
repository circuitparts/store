import { AUTH_PAGES } from "@/lib/constants/page-routes";
import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default authMiddleware({
	// Public routes are routes that don't require authentication
	publicRoutes: [
		"/",
		"/api(.*)",
		"/auth/login",
		"/auth/signup",
		"/auth/signup/verify-email",
		"/auth/reset-password",
		"/auth/reset-password/step2",
		"/products(.*)",
		"/contact-us",
		"/cart",
		"/privacy-policy",
		"/shipping-and-returns",
		"/terms-and-conditions",
		"/coming-soon",
		"/docs(.*)",
	],
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
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
