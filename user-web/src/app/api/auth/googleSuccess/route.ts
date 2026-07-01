import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const accessToken = searchParams.get('accessToken');
	const refreshToken = searchParams.get('refreshToken');
	const email = searchParams.get('email'); // Lấy email từ BE truyền qua
	// Nếu không có token từ BE truyền sang, đá về login
	if (!accessToken) {
		return NextResponse.redirect(new URL('/login?error=auth_failed', request.url));
	}

	try {
		// Chuẩn bị Redirect về trang chủ ('/')
		const redirectUrl = new URL(`/?email=${email}`, request.url);
		const nextResponse = NextResponse.redirect(redirectUrl);

		// Gắn Cookie bảo mật vào Response gửi về cho Trình duyệt
		nextResponse.cookies.set({
			name: 'X-Access-Token',
			value: accessToken,
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			path: '/',
			maxAge: 60 * 60 * 24, // 1 ngày
		});

		if (refreshToken) {
			nextResponse.cookies.set({
				name: 'X-Refresh-Token',
				value: refreshToken,
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
				path: '/',
				maxAge: 60 * 60 * 24 * 7, // 7 ngày
			});
		}

		return nextResponse;
	} catch (error: any) {
		console.error('[Google Auth BFF Error]:', error.message);
		return NextResponse.redirect(new URL('/login?error=server_error', request.url));
	}
}
