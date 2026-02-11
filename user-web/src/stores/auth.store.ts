import { create } from 'zustand';

interface AuthState {
	isAuthenticated: boolean;
	setAuthenticated: (value: boolean) => void;
	logout: () => Promise<void>;
	checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
	isAuthenticated: false,
	setAuthenticated: (value: boolean): void => set({ isAuthenticated: value }),
	checkAuth: async () => {
		try {
			const res = await fetch('api/me', {
				credentials: 'include',
			});

			set({ isAuthenticated: res.status === 200 });
		} catch (error) {
			set({ isAuthenticated: false });
			console.log(error);
		}
	},
	logout: async () => {
		await fetch('api/logout', {
			credentials: 'include',
		});
		set({ isAuthenticated: false });
	},
}));
