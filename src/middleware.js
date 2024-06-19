import { NextResponse } from "next/server";
import { auth } from "./auth";
import { apiAuthRoutePrefix, authRoutes, managerRoutePrefix } from "./routes";

export default auth(async (req) => {
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = req.nextUrl.pathname.startsWith(apiAuthRoutePrefix);
  const isAuthRoute = authRoutes.includes(req.nextUrl.pathname);
  const isManagerRoute = req.nextUrl.pathname.startsWith(managerRoutePrefix);

  // api auth routes - "/api/auth"
  if (isApiAuthRoute) NextResponse.next();

  // can't go to manager routes without logged in
  if (!isLoggedIn && isManagerRoute) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }

  // logged in USER & MANAGER can't go to "/login" & "/register"
  if (isAuthRoute && isLoggedIn) {
    if (req.auth?.user?.role === "MANAGER") {
      return Response.redirect(new URL("/manager", req.nextUrl));
    }
    return Response.redirect(new URL("/", req.nextUrl));
  }

  if (isLoggedIn) {
    // logged in MANAGER can't got to "/"
    if (
      !isApiAuthRoute &&
      req.auth?.user?.role === "MANAGER" &&
      !req.nextUrl.pathname.startsWith(managerRoutePrefix)
    ) {
      return NextResponse.redirect(new URL("/manager", req.nextUrl));
    }
    // logged in USER can't go to "/manager"
    if (
      req.auth?.user?.role === "USER" &&
      req.nextUrl.pathname.startsWith(managerRoutePrefix)
    ) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
