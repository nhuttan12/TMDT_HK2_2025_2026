'use server';

import { cookies } from 'next/headers';

export async function logoutServerAction(): Promise<{ success: boolean }> {
	const cookieStore = await cookies();

	// 1. Định nghĩa các options giống hệt lúc bạn Set Cookie (quan trọng nhất là path)
	const cookieOptions = {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict' as const,
		path: '/', // Đảm bảo trùng path lúc set để xóa sạch hoàn toàn
	};

	// 2. Xóa các token bằng cách set Max-Age về 0
	cookieStore.set('X-Access-Token', '', { ...cookieOptions, maxAge: 0 });
	cookieStore.set('X-RefreshToken', '', { ...cookieOptions, maxAge: 0 });

	// 3. Nếu Backend của bạn có API logout (để blacklist refresh token), hãy gọi ở đây
	/*
	try {
	   await backendApi.post('/auth/logout', {}, {
		  headers: { Cookie: `refreshToken=${cookieStore.get('refreshToken')?.value}` }
	   });
	} catch (e) {
	   // Log lỗi nhưng vẫn cho phép user logout ở phía frontend
	}
	*/

	return { success: true };
}
