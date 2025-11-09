import { getDashboardRoute } from "@/lib/role";
import { NextResponse, type NextRequest } from "next/server";

const AUTH_PATHS = ["/login", "/register"];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;
  const url = req.nextUrl.clone();

  // Jika belum login
  if (!token && !AUTH_PATHS.includes(url.pathname)) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Jika login, validasi token ke Laravel
  if (token) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const response = NextResponse.redirect(new URL("/login", req.url));
        response.cookies.delete("authToken");
        return response;
      }

      const user = await res.json();
      const roleRoute = getDashboardRoute(user.role);

      if (url.pathname === "/" || AUTH_PATHS.includes(url.pathname)) {
        url.pathname = roleRoute;
        return NextResponse.redirect(url);
      }

      // refresh token expiry 3 hari
      const response = NextResponse.next();
      response.cookies.set("authToken", token, {
        path: "/",
        httpOnly: false, // biar bisa diakses di client
        maxAge: 3600 * 24 * 3,
      });
      return response;
    } catch (err) {
      console.error("Middleware Error:", err);
      const response = NextResponse.redirect(new URL("/login", req.url));
      response.cookies.delete("authToken");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
