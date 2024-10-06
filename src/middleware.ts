import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getCurrentUser } from "./services/auth-service";

const AuthRoutes = ["/login", "/register"];

type Role = keyof typeof roleBasedRoutes;

const roleBasedRoutes = {
  user: [/^\/profile/, /^\/user/],
  admin: [/^\/admin/],
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // console.log("/////////////////req", request.url);
  // console.log("/////////////////path", pathname);

  const user = await getCurrentUser();

  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  }

  if (user?.role && roleBasedRoutes[user?.role as Role]) {
    const routes = roleBasedRoutes[user?.role as Role];

    // console.log("/////////////////routes", routes);

    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/profile", "/profile/:page*", "/admin", "/login", "/register"],
};
