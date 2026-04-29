import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import { mountStoreDevtool } from 'simple-zustand-devtools';

export interface UserModel {
	username: string;
}
interface AuthState {
	isAuthenticated: boolean;
	user: UserModel | null;
	login: (user?: UserModel) => void;
	logout: () => void;
}
// quản lý đang nhập cảu người dùng
export const useAuthStore = create<AuthState>()(
	devtools(
		persist(
			(set) => ({
				isAuthenticated: false,
				user: null,

				login: (user?: UserModel): void => {
					set({ isAuthenticated: true, user });
				},

				logout: (): void => {
					set({ isAuthenticated: false, user: null });
				},
			}),
			{
				name: 'auth-storage', // Key duy nhất trong LocalStorage
				storage: createJSONStorage((): Storage => localStorage), // Chỉ định dùng localStorage
			},
		),
		{ name: "AuthStore"}
	),
);

