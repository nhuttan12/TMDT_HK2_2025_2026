// eslint-disable-next-line import/no-unresolved
import 'server-only';
import axios, {
	type AxiosResponse,
	type AxiosError,
	type InternalAxiosRequestConfig }
	from 'axios';
import { cookies } from 'next/headers';
import { type ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import {type ResponseApi } from '@/types/commom/ResponseApi';

if (process.env.NODE_ENV === 'development') {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const backendUrl: string = 'https://localhost:7087/api';

const apiServer = axios.create({
	baseURL: backendUrl,
	timeout: 15000,
	headers: { 'Content-Type': 'application/json' },
});

apiServer.interceptors.request.use(
	async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
		console.log("interceptors for requests")
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
			const cookieStore: ReadonlyRequestCookies = await cookies();
			const token: string | undefined = cookieStore.get('accessToken')?.value;

			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		} catch (e) {
			// Silent catch cho static rendering
		}

		return config;
	},
);

apiServer.interceptors.response.use(
	(response: AxiosResponse): AxiosResponse => {
		console.log(
			`[API-SUCCESS] ${response.config.method?.toUpperCase()} ${response.config.url} - Status: ${response.status}`,
		);
		return response;
	},
	async (error: AxiosError): Promise<AxiosResponse> => {
		console.log('interceptors for response');
		const status: number = error.response?.status || 500;

		interface DotNetError {
			message?: string;
			errors?: Record<string, string[]>;
		}

		const responseData = error.response?.data as DotNetError | undefined;

		const fallbackResponse: ResponseApi<null> = {
			isSuccess: false,
			data: null,
			error: {
				code: `SERVER_HTTP_${status}`,
				message: 'Lỗi kết nối Backend',
				errorType: 'ServerError',
			},
		};

		if (status === 401) {
			fallbackResponse.error = {
				code: 'UNAUTHORIZED',
				message: 'Phiên đăng nhập không hợp lệ.',
				errorType: 'AuthenticationError',
			};
		} else if (responseData) {
			let errorMessage: string = responseData.message || fallbackResponse.error!.message;
			if (responseData.errors) {
				errorMessage = Object.values(responseData.errors).flat().join(', ');
			}
			fallbackResponse.error = {
				code: 'VALIDATION_ERROR',
				message: errorMessage,
				errorType: 'DotNetError',
			};
		}

		// Đè lại data chuẩn hóa vào cái vỏ Axios có sẵn
		if (error.response) {
			error.response.data = fallbackResponse;
			return Promise.resolve(error.response);
		}

		const mockResponse: AxiosResponse = {
			data: fallbackResponse,
			status: status,
			statusText: 'Network Error',
			headers: {},
			config: error.config!,
		};
		console.log(mockResponse);

		return Promise.resolve(mockResponse);
	},
);
export default apiServer;
