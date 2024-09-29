import { type NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const sessionCookie = req.cookies.get("session"); // Adjust the cookie name if necessary

  // If the session cookie is missing, redirect to the sign-in page
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  // If session cookie exists, proceed with the request
  return NextResponse.next();
}

// Apply middleware only to routes that start with /our-blog
export const config = {
  matcher: ["/our-blog/:path*"],
};
