import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/**
 * Define all routes that should be publicly accessible without auth.
 * Critically, /webhook MUST be public so Stripe can POST to it without
 * Clerk intercepting/blocking the raw request.
 */
const isPublicRoute = createRouteMatcher([
  "/",                // Home page
  "/product(.*)",     // Product detail pages
  "/category(.*)",    // Category pages
  "/search(.*)",      // Search results
  "/webhook(.*)",     // Stripe webhook — must never be protected
  "/studio(.*)",      // Sanity Studio
]);

export default clerkMiddleware(async (auth, request) => {
  // Only protect non-public routes (e.g. /orders, /my-cart)
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};