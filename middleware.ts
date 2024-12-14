import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const protectedRoute = createRouteMatcher([
  "/",
  "/upcoming",
  "/inviting",
  "/previous",
  "/recordings",
  "/meeting(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (protectedRoute(req)) {
    const url = req.nextUrl;
    const username = url.searchParams.get("username");
    const email = url.searchParams.get("email");

    if (username && email) {
      console.log(`Username: ${username}, Email: ${email}`);
    } else {
      console.error("Missing required query parameters.");
    }

    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
