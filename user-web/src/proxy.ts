import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const PROTECTED_ROUTES = [ '/profile', '/orders', '/shop', '/admin'];
const AUTH_ROUTES = ['/login', '/register'];

export function proxy(request: NextRequest) {
  const token = request.cookies.get('X-Access-Token')?.value;
  const { pathname } = request.nextUrl;
  // 1. Xác định trạng thái Route
  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
  // const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));

  // 2. Xử lý Logic Điều hướng
  if (isProtectedRoute && !token) {
    // Lưu lại trang hiện tại để sau khi login xong quay lại đúng trang đó
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // if (isAuthRoute && token) {
  //   // Nếu đã login mà cố vào trang login/register thì đẩy về dashboard
  //   return NextResponse.redirect(new URL('/', request.url));
  // }

  return NextResponse.next();
}

// Tối ưu Matcher để tránh middleware chạy vào các file tĩnh (static files)
export const config = {
  matcher: [
    /*
     * Khớp tất cả các request ngoại trừ:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};