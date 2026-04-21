import { create } from 'zustand';
interface AuthState {
	isAuthenticated: boolean;
	login:() => Promise<void>;
	logout: () => Promise<void>;
	authCheck:() => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	isAuthenticated: false,
	login: async () => {
		set({ isAuthenticated: true });
	},
	logout: async () => {
		set({ isAuthenticated: false });
	},
	authCheck: () => ({
		
	})
}));
