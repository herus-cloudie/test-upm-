import { NextResponse } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

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
  
  const cookieStore = req.cookies;
  const allowedDomainCookie = cookieStore.get('allowed-domain');
  
  const originHeader = requestHeaders.get("origin");
  const isAllowedDomain =
    originHeader === allowedDomain || allowedDomainCookie as any === allowedDomain;

  if (!isAllowedDomain) {
    console.error(`Access denied. Unauthorized domain. Origin: ${originHeader}`);
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
