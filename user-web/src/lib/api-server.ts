// eslint-disable-next-line import/no-unresolved
import 'server-only';
import axios, { type AxiosResponse, type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { cookies } from 'next/headers';
import * as https from 'node:https';

const isDevMode: boolean = process.env.NODE_ENV === 'development';
const httpsAgent = new https.Agent({
	rejectUnauthorized: !isDevMode,
});

const backendUrl: string = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7087/api';

const apiServer = axios.create({
	baseURL: backendUrl,
	timeout: 15000,
	headers: { 'Content-Type': 'application/json' },
	httpsAgent: httpsAgent,
});

apiServer.interceptors.request.use(
	async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
		const publicEndpoints: string[] = [
			'/auth/register',
			'/auth/login',
			'/auth/forgot-password',
		];

		const isPublicEndpoint: boolean = publicEndpoints.some((endpoint: string): boolean => {
			return Boolean(config.url?.includes(endpoint));
		});

		if (isPublicEndpoint) {
			return config;
		}

		try {
			// TỰ ĐỘNG ĐÍNH KÈM COOKIE:
			// Lấy toàn bộ cookie store của request hiện tại từ client gửi lên Next.js
			const cookieStore = await cookies();

			// Chuyển toàn bộ danh sách cookie thành chuỗi dạng "key1=value1; key2=value2"
			const allCookiesString = cookieStore.toString();

			if (allCookiesString) {
				// Đính kèm toàn bộ cookie này vào header của request gửi sang .NET Backend
				config.headers.set('Cookie', allCookiesString);
			}

			// Phân tách thêm: Nếu bạn vẫn muốn chuyển đổi accessToken thành dạng Bearer để backend dễ xử lý
			const token = cookieStore.get('accessToken')?.value;
			if (token && !config.headers.Authorization) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		} catch (e) {
			// Bỏ qua lỗi này khi Next.js thực hiện Static Generation (Prerendering lúc build)
			console.warn(
				'Đang chạy static render hoặc không có context request, bỏ qua tự động đính kèm cookie.',
			);
		}

		console.log('=== CHI TIẾT REQUEST GỬI ĐI ===');
		console.log(`[${config.method?.toUpperCase()}] ${config.baseURL}${config.url}`);
		console.log('Headers:', config.headers);
		if (config.data) {
			console.log('Body/Data:', config.data);
		}
		console.log('===============================');

		return config;
	},
);

apiServer.interceptors.response.use(
	(response: AxiosResponse): AxiosResponse => {
		return response;
	},
	async (error: AxiosError): Promise<never> => {
		const status: number = error.response?.status || 500;
		// ... Giữ nguyên logic xử lý chuẩn hóa lỗi của bạn ...
		if (error.response) {
			error.response.data = { isSuccess: false, error: { message: 'Lỗi kết nối' } }; // Ví dụ minh họa vỏ lỗi của bạn
		}
		return Promise.reject(error);
	},
);

export default apiServer;
