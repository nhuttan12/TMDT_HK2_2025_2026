import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';

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
	syncAuth: (email: string) => void;
}
// quản lý đang nhập của người dùng
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
				syncAuth: (email: string) => {
					set({ isAuthenticated: true, user: { username: email } });
				},
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

