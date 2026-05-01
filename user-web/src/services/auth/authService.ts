import { UserModel } from '@/stores/auth.store';
import apiClient from '@/lib/api-client';

export interface LoginPayload {
	email: string;
	password: string;
	[key: string]: string;
}

export interface LoginResponse {
	status: string;
}

export const authService = {
	login: (data: Partial<LoginPayload>): Promise<LoginResponse> => {
		// //TODO: remove
		// 	// Mock API: Giả lập thành công sau 1 giây
		if (data.password === '1') {
			return new Promise<{ status :'oke' }>((resolve, reject) => {
				setTimeout(() => {
					if (data.email === 'admin@gmail.com' && data.password === '1') {
						//  thực hiện gọi localhost:3000/api/dev/mock-auth
						fetch('/api/dev/mock-auth');
						resolve({ status: 'oke' });
					} else {
						reject(new Error('Invalid credentials'));
					}
				}, 1000);
			});
		}
		// Chỉ gửi request và trả về data. Lỗi sẽ được TanStack Query bắt ở lớp Hook.
		return apiClient.post('/auth/login', data);
	},
	checkMe: (): UserModel => {
		console.log('Checking me');
		return {
			username: 'tam',
		};
	},

	loginWithGoogle: () => {
		window.location.assign('/api/auth/google');
	},
	getProfile() {
		return undefined;
	},
};
