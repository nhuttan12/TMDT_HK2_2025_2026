// eslint-disable-next-line import/no-unresolved
import 'server-only'; // Đảm bảo an toàn tuyệt đối
if (process.env.NODE_ENV === 'development') {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}
import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Định nghĩa chuẩn Response từ .NET 9 (ProblemDetails hoặc ApiResponse)
interface ApiError {
	message?: string;
	errors?: Record<string, string[]>;
}
const d = "https://localhost:7087/api";
const apiServer = axios.create({
	// baseURL: process.env.BACKEND_INTERNAL_URL, // Dùng Internal URL cho Server-to-Server
	baseURL: d,
	timeout: 15000,
	headers: { 'Content-Type': 'application/json' },
});

apiServer.interceptors.request.use(async (config) => {
	const publicEndpoints = ['/auth/login', '/auth/register', '/auth/forgot-password'];
	// Nếu URL hiện tại nằm trong whitelist, trả về config ngay lập tức
	if (publicEndpoints.some((endpoint) => config.url?.includes(endpoint))) {
		return config;
	}
	try {
		const cookieStore = await cookies();
		const token = cookieStore.get('accessToken')?.value;

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
	} catch (e) {
		// Handle cases where cookies are not accessible (e.g. static rendering)
	}
	return config;
});

apiServer.interceptors.response.use(
	(response) => response.data, // Trả về data trực tiếp để Service layer gọn hơn
	async (error) => {
		const status = error.response?.status;

		// Xử lý lỗi 401 chuyên nghiệp
		if (status === 401) {
			// Không nên redirect ngay trong Interceptor nếu đây là một API call ngầm
			// Nhưng nếu là trang chính, redirect là hợp lý
			redirect('/login');
		}

		// Senior Tip: Xử lý lỗi từ .NET FluentValidation
		const apiError: ApiError = error.response?.data;
		let errorMessage = apiError?.message || "Something went wrong";

		if (apiError?.errors) {
			// Flatten các lỗi từ Validation của .NET
			errorMessage = Object.values(apiError.errors).flat().join(", ");
		}

		return Promise.reject(new Error(errorMessage));
	}
);

export default apiServer;