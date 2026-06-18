// src/lib/api-client.ts
import axios, { type AxiosResponse, type AxiosError } from 'axios';
import { type ResponseApi } from '@/types/commom/ResponseApi';

const apiClient = axios.create({
	baseURL: '/api',
	timeout: 10000,
	withCredentials: true,
	headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.response.use(
	(response: AxiosResponse): AxiosResponse => {
		return response;
	},
	async (error: AxiosError): Promise<never> => {
		const status: number = error.response?.status || 500;

		if (status === 401 && typeof window !== 'undefined') {
			window.location.href = '/login';
		}

		// SỬA TẠI ĐÂY: Trả về Reject để TanStack Query nhảy vào onError
		if (error.response && error.response.data) {
			return Promise.reject(error);
		}

		// Lỗi mạng giả lập (Mất kết nối hoàn toàn)
		const mockResponse: AxiosResponse = {
			data: {
				isSuccess: false,
				data: null,
				error: {
					code: `CLIENT_HTTP_${status}`,
					message: 'Không thể kết nối đến máy chủ Next.js',
					errorType: 'NetworkError',
				},
			} as ResponseApi<null>,
			status: status,
			statusText: 'Network Error',
			headers: {},
			config: error.config!,
		};

		// Gắn cái vỏ giả vào object error và reject nó
		error.response = mockResponse;
		return Promise.reject(error);
	},
);

export default apiClient;
