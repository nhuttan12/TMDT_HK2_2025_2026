import { NextResponse } from 'next/server';
import apiServer from '@/lib/api-server';
import { ResponseApi, LoginPayload } from '@/types/commom/ResponseApi';

export async function POST(request: Request): Promise<NextResponse> {
	try {
		// 1. Ép kiểu dữ liệu body từ Client
		const body = (await request.json()) as LoginPayload;
		const backendUrl = '/auth/login';

		// 2. Gọi apiServer (Luôn trả về ResponseApi, không bao giờ văng lỗi)
		const responseData = await apiServer.post<any, ResponseApi<object>>(backendUrl, body);

		// 3. Quyết định Status Code trả về cho trình duyệt
		let httpStatus: number = 200;

		if (!responseData.IsSuccess) {
			if (responseData.Error?.Code === 'UNAUTHORIZED') {
				httpStatus = 401;
			} else {
				httpStatus = 400; // Có thể đổi thành 422 nếu team .NET quy định
			}
		}

		// 4. Trả kết quả chuẩn về cho Client
		return NextResponse.json(responseData, { status: httpStatus });
	} catch (error) {
		// Khối catch này chỉ dùng để bắt lỗi sập Runtime của Next.js (VD: request.json() thất bại)
		const errorMessage: string =
			error instanceof Error ? error.message : 'Unknown Next.js Error';

		const fatalError: ResponseApi<null> = {
			IsSuccess: false,
			Value: null,
			Error: {
				Code: 'INTERNAL_API_ERROR',
				Message: errorMessage,
				ErrorType: 'NextJsRuntimeError',
			},
		};

		return NextResponse.json(fatalError, { status: 500 });
	}
}
