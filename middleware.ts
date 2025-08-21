import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // If the user is not authenticated (no token) and trying to access a protected route (not /login),
    // withAuth will handle the redirect to the sign-in page specified in `pages.signIn`.
    // We add an explicit redirect here if they somehow land on /login while authenticated.
    if (req.nextauth.token && req.nextUrl.pathname === '/login') {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/login', // Specify the custom sign-in page
    },
  }
);

export const config = {
  matcher: [
    // Match all paths except Next.js internal assets and API routes
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};