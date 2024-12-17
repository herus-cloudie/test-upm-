import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const allowedDomain = "https://upm.cns365.ir"; 

const protectedRoute = createRouteMatcher([
  "/",
  "/upcoming",
  "/inviting",
  "/previous",
  "/recordings",
  "/meeting(.*)",
]);

export default clerkMiddleware((auth, req) => {
  const url = req.nextUrl;
  const requestHeaders = req.headers;

  const referer = requestHeaders.get("referer");
  const origin = requestHeaders.get("origin");

  const isAllowedDomain =
    referer?.startsWith(allowedDomain) || origin === allowedDomain;

  if (!isAllowedDomain) {
    console.error(`Request blocked. Unauthorized domain: ${referer || origin}`);
    return NextResponse.json(
      { error: "Access forbidden. Unauthorized domain." },
      { status: 403 }
    );
  }

  if (protectedRoute(req)) {
    const username = url.searchParams.get("username");
    const email = url.searchParams.get("email");

    if (username && email) {
      console.log(`Username: ${username}, Email: ${email}`);
    } else {
      console.error("Missing required query parameters.");
    }

    auth().protect();
  }

  return NextResponse.next(); 
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
