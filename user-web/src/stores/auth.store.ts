import { create } from 'zustand';

interface UserModel {
    username: string;
}
interface AuthState {
	isAuthenticated: boolean;
    user: UserModel | null;
	login: (user?: UserModel) => void;
    logout: () => void;
}
// quản lý đang nhập cảu người dùng
export const useAuthStore = create<AuthState>((set) => ({
	isAuthenticated: false,
    user: null,
    // Đồng bộ trạng thái vào store sau khi API thành công
    login: ( user) => set({ isAuthenticated: true, user }),
    logout: () => {
        // Xử lý xóa token/cookie ở đây nếu cần
        set({ isAuthenticated: false, user: null });
    },
}));
