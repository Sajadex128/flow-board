import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // مسیرهای عمومی (لاگین و ثبت نام)
  const isAuthPage = pathname === "/login" || pathname === "/register";
  
  // مسیرهای api و فایل‌های استاتیک
  const isApiPath = pathname.startsWith("/api");
  const isStaticPath = pathname.startsWith("/_next") || 
                       pathname.startsWith("/favicon.ico") || 
                       pathname.includes(".");

  // اگر مسیر api یا استاتیک است، ادامه بده
  if (isApiPath || isStaticPath) {
    return NextResponse.next();
  }

  // اگر کاربر لاگین نکرده و در صفحه auth نیست، به لاگین برو
  if (!token && !isAuthPage) {
    console.log("🔴 Redirecting to login from:", pathname);
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (token && isAuthPage) {
    console.log("🟢 Redirecting to home from:", pathname);
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};