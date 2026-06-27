import { NextResponse } from 'next/server';
// localhost:3000/api/dev/mock-auth
export async function GET() {
	// Chỉ cho phép chạy ở môi trường development
	if (process.env.NODE_ENV === 'production') {
		return NextResponse.json({ error: 'Not allowed' }, { status: 403 });
	}

	const response = NextResponse.json({
		message: 'Mock _login successful',
		user: { id: '1', name: 'Le Thanh Tam', role: 'admin' },
	});

	const cookieAccess = {
		httpOnly: true,
		secure: false, // Để false ở localhost để dễ test
		sameSite: 'strict' as const,
		path: '/',
		maxAge: 60 * 60 * 24, // 1 ngày
	};

	// Set các token giả
	response.cookies.set('X-Access-Token', 'mock-access-token-123', cookieAccess);
	const cookieRefresh = {
		httpOnly: true,
		secure: false, // Để false ở localhost để dễ test
		sameSite: 'strict' as const,
		path: '/',
		maxAge: 60 * 60 * 24*30, // 1 tháng
	};
	response.cookies.set('X-Refresh-Token', 'mock-refresh-token-456', cookieRefresh);

	return response;
}
