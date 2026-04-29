import apiClient from '@/lib/axios';
import { UserModel } from '@/stores/auth.store';

export interface LoginPayload {
	email: string;
	password: string;
	[key: string]: string;
}

export interface LoginResponse {
	user: {
		username: string;
	};
}

export const authService = {
	login: async ({ email, password }: LoginPayload): Promise<LoginResponse> => {
		//TODO: remove
			// Mock API: Giả lập thành công sau 1 giây
		if (email === 'admin@gmail.com') {
			return new Promise<{ user: { username: string } }>((resolve, reject) => {
				setTimeout(() => {
					if (email === 'admin@gmail.com' && password === '1') {
						resolve({ user: { username: 'admin' } });
					} else {
						reject(new Error('Invalid credentials'));
					}
				}, 1000);
			});
		}
		// Chỉ gửi request và trả về data. Lỗi sẽ được TanStack Query bắt ở lớp Hook.
		const response = await apiClient.post('/login', { email, password });
		return response.data;
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
};
