import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import { mountStoreDevtool } from 'simple-zustand-devtools';

export interface UserModel {
	username: string;
}
interface AuthState {
	isAuthenticated: boolean;
	_hasHydrated: boolean;
	user: UserModel | null;
	login: (user?: UserModel) => void;
	logout: () => void;
	setHasHydrated: (state: boolean) => void;
}
// quản lý đang nhập cảu người dùng
export const useAuthStore = create<AuthState>()(
	devtools(
		persist(
			(set) => ({
				isAuthenticated: false,
				_hasHydrated: false,
				user: null,

				login: (user?: UserModel): void => {
					set({ isAuthenticated: true, user });
				},

				logout: () => {
					set({ isAuthenticated: false, user: null });

					localStorage.removeItem('auth-storage');
				},
				setHasHydrated: (state) => set({ _hasHydrated: state }),
			}),
			{
				name: 'auth-storage', // Key duy nhất trong LocalStorage
				storage: createJSONStorage((): Storage => localStorage), // Chỉ định dùng localStorage
				onRehydrateStorage: () => (state) => {
					state?.setHasHydrated(true);
				},
			},
		),
		{ name: 'auth-storage' },
	),
);

