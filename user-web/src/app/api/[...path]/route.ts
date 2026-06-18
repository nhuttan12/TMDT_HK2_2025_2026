import { NextRequest, NextResponse } from 'next/server';
import apiServer from '@/lib/api-server';
import { ResponseApi } from '@/types/commom/ResponseApi';

// Định nghĩa kiểu dữ liệu cho Params theo chuẩn Next.js mới
interface ProxyRouteProps {
	params: Promise<{ path: string[] }>;
}

// Hàm xử lý trung tâm cho mọi Method
async function universalProxyHandler(
	request: NextRequest,
	props: ProxyRouteProps,
): Promise<NextResponse> {
	try {
		// 1. Trích xuất Dynamic Path và Query String
		const resolvedParams = await props.params;
		const endpointPath: string = resolvedParams.path.join('/'); // VD: 'users/1'

		const url = new URL(request.url);
		const searchParams: string = url.search; // VD: '?page=1&sort=desc'

		// Đường dẫn cuối cùng để gửi sang .NET
		const backendEndpoint: string = `/${endpointPath}${searchParams}`;

		// 2. Lấy Method của request hiện tại
		const method: string = request.method; // GET, POST, PUT, DELETE...

		// 3. Trích xuất Body một cách an toàn (Bỏ qua GET/HEAD vì không có body)
		let body: unknown = undefined;
		if (method !== 'GET' && method !== 'HEAD') {
			const contentType = request.headers.get('content-type') || '';
			if (contentType.includes('application/json')) {
				body = await request.json();
			} else if (contentType.includes('multipart/form-data')) {
				body = await request.formData(); // Hỗ trợ upload file
			} else {
				body = await request.text();
			}
		}

		// 4. Forward sang .NET Backend thông qua apiServer hiện có của bạn
		// Interceptor của bạn đã tự động lo việc đính kèm Token (Bearer) từ Cookies
		const response = await apiServer.request<ResponseApi<unknown>>({
			url: backendEndpoint,
			method: method,
			data: body,
		});

		// 5. Trả kết quả chuẩn hóa về cho Client
		// Response.data lúc này đã là ResponseApi (do Interceptor của apiServer đã map)
		const httpStatus: number = response.status;
		return NextResponse.json(response.data, { status: httpStatus });
	} catch (error: unknown) {
		const errorMessage: string = error instanceof Error ? error.message : 'Unknown Proxy Error';

		const fatalError: ResponseApi<null> = {
			isSuccess: false,
			data: null,
			error: {
				code: 'INTERNAL_PROXY_ERROR',
				message: errorMessage,
				errorType: 'NextJsRuntimeError',
			},
		};

		return NextResponse.json(fatalError, { status: 500 });
	}
}

// Next.js yêu cầu export tường minh các HTTP Methods
export const GET = universalProxyHandler;
export const POST = universalProxyHandler;
export const PUT = universalProxyHandler;
export const DELETE = universalProxyHandler;
export const PATCH = universalProxyHandler;
