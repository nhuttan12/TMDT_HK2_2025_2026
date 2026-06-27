// src/app/api/auth/_login/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import apiServer from '@/lib/api-server';
import { ResponseApi } from '../../../../types/common/ResponseApi';

export interface TokenData {
	accessToken: string;
	refreshToken: string;
}

export interface LoginPayload {
	email: string;
	password: string;
}

export async function POST(request: Request): Promise<NextResponse> {
	try {
		const body = (await request.json()) as LoginPayload;
		const backendUrl = '/auth/_login';

		// 1. Gọi .NET Backend để lấy Token
		const response = await apiServer.post(backendUrl, body);
		const responseData = response.data as ResponseApi<TokenData>;

		let httpStatus: number = 200;

		if (!responseData.isSuccess) {
			httpStatus = responseData.error?.code === 'UNAUTHORIZED' ? 401 : 400;
			return NextResponse.json(responseData, { status: httpStatus });
		}

		// 2. KHỞI TẠO NEXTRESPONSE
		const nextResponse = NextResponse.json(responseData, { status: httpStatus });

		// 3. THỰC HIỆN GHI HTTPONLY COOKIE KHI THÀNH CÔNG
		if (responseData.isSuccess && responseData.data) {
			const { accessToken, refreshToken } = responseData.data;
			const cookieStore = await cookies();

			// Tự động bật tắt cờ Secure dựa vào môi trường Dev hay Production
			const isProduction: boolean = process.env.NODE_ENV === 'production';

			// Cấu hình lưu Access Token (Hết hạn sau 1 tiếng)
			cookieStore.set('X-Access-Token', accessToken, {
				httpOnly: true, // Ngăn chặn JavaScript (FE) đọc token chống XSS
				secure: isProduction, // Bắt buộc dùng HTTPS trên Prod, ở localhost dev (HTTP) vẫn chạy được
				sameSite: 'lax', // Chống tấn công CSRF, tối ưu cho cấu trúc BFF chung nguồn (Same-site)
				path: '/', // Cookie có hiệu lực cho toàn bộ các trang trên ứng dụng
				maxAge: 60 * 60, // Hết hạn sau 3600 giây (1 giờ) - khớp với thời gian sống của token
			});

			// Cấu hình lưu Refresh Token (Hết hạn sau 7 ngày)
			cookieStore.set('X-Refresh-Token', refreshToken, {
				httpOnly: true,
				secure: isProduction,
				sameSite: 'lax',
				path: '/api/auth/refresh-token', // CHIẾN LƯỢC: Chỉ gửi kèm cookie này lên khi gọi API refresh token, các API khác sẽ không mang theo, giảm thiểu rủi ro rò rỉ
				maxAge: 7 * 24 * 60 * 60, // 7 ngày
			});
		}

		return nextResponse;
	} catch (error: unknown) {
		console.error(`[NEXTJS-RUNTIME-ERROR] Lỗi API Route Login:`, error);
		const errorMessage: string =
			error instanceof Error ? error.message : 'Unknown Next.js Error';

		const fatalError: ResponseApi<null> = {
			isSuccess: false,
			data: null,
			error: {
				code: 'INTERNAL_API_ERROR',
				message: errorMessage,
				errorType: 'NextJsRuntimeError',
			},
		};
		return NextResponse.json(fatalError, { status: 500 });
	}
}
