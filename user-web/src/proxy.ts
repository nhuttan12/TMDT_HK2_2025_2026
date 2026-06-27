import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { use } from 'react';
import { useAuthStore } from './stores/auth.store';

const PROTECTED_ROUTES = [ '/profile', '/orders'];
const AUTH_ROUTES = ['/_login', '/register'];

export function proxy(request: NextRequest) {
  const token = request.cookies.get('X-Access-Token')?.value;
  console.log('proxy', request.url);
  const { pathname } = request.nextUrl;
  // 1. Xác định trạng thái Route
  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
  // const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));

  // 2. Xử lý Logic Điều hướng
  if (isProtectedRoute && !token) {
    // Lưu lại trang hiện tại để sau khi _login xong quay lại đúng trang đó
    const loginUrl = new URL('/_login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // if (isAuthRoute && token) {
  //   // Nếu đã _login mà cố vào trang _login/register thì đẩy về dashboard
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