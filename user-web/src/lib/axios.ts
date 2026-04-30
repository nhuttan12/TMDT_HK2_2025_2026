// // src/lib/axios.ts
// import axios from 'axios';
//
// const apiClient = axios.create({
// //   baseURL: process.env.NEXT_PUBLIC_API_URL, // Lấy từ file .env
//     baseURL: "https://localhost:7087/api",
//     timeout: 5000,
// });
//
// export default apiClient;


// src/services/server/axios-instance.ts
import axios from 'axios';
import { redirect } from 'next/navigation';

const serverState = axios.create({
	// baseURL: process.env.BACKEND_API_URL,
	baseURL: 'https://localhost:7087/api',
	timeout: 15000,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
});

// Interceptor cho Request: Tự động gắn Token từ Cookie vào Header
// serverState.interceptors.request.use(async (config) => {
// 	const cookieStore = await cookies();
// 	const token = cookieStore.get('accessToken')?.value;
//
// 	if (token && config.headers) {
// 		config.headers.Authorization = `Bearer ${token}`;
// 	}
// 	return config;
// });

// Interceptor cho Response: Xử lý lỗi tập trung (Global Error Handling)
serverState.interceptors.response.use(
	(response) => response, // Chỉ trả về data (ApiResponse<T>)
	(error) => {
		if (error.response?.status === 401) {
			redirect('/login');
		}
		// Senior tip: Format lại error message từ Backend (.NET 9 FluentValidation)
		const message = error.response?.data?.message || "Internal Server Error";
		return Promise.reject(new Error(message));
	}
);

export default serverState;