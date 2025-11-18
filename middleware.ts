import { NextResponse, NextRequest } from "next/server";

const PUBLIC_PATHS = ["/", "/login", "/register"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authNextToken")?.value;
  const { pathname } = req.nextUrl;

  const isPublic = PUBLIC_PATHS.includes(pathname);
  const isDashboard = pathname.startsWith("/dashboard");

  // USER TIDAK LOGIN → akses protected → tendang ke "/"
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // USER LOGIN → masuk halaman public → redirect ke dashboard default
  if (token && isPublic) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // USER LOGIN → akses dashboard → izinkan
  if (token && isDashboard) {
    return NextResponse.next();
  }

  // Route lain → izinkan
  return NextResponse.next();
}

export const config = {
matcher: ["/((?!_next|favicon.ico).*)"],
};