import { UserModel } from '@/stores/auth.store';
import apiClient from '@/lib/api-client';
import apiServer from '@/lib/api-server';

export interface LoginPayload {
	email: string;
	password: string;
	[key: string]: string;
}

export interface LoginResponse {
	status: string;
}

export interface RegisterRequest {
	email: string;
	password: string;
}
export interface RegisterResponse {
	email: string;
}
export interface RefreshTokenResponse {
	token: string
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
	register: (data: RegisterRequest): Promise<RegisterResponse> => {
		if (data.password === '1') {
			return new Promise<{ email: 'oke' }>((resolve, reject) => {
				setTimeout(() => {
					if ( data.password === '1') {
						//  thực hiện gọi localhost:3000/api/dev/mock-auth
						fetch('/api/dev/mock-auth');
						resolve({ email: 'oke' });
					} else {
						reject(new Error('Invalid credentials'));
					}
				}, 1000);
			});
		}
		console.log(data);

		return apiClient.post('/auth/register', data);
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
	refreshToken: (): Promise<RefreshTokenResponse> =>{
		console.log('refreshToken')
		return apiClient.post('/auth/refresh-token')
	},
};
