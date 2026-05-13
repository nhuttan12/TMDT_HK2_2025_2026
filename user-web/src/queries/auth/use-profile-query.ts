// src/queries/auth/use-profile-query.ts
import { useQuery } from '@tanstack/react-query';
import { authKeys } from '@/queries/auth/auth-key';
import { authService } from '@/services/auth/authService';
// giải
export const useProfileQuery = (options = {}) => {
	return useQuery({
		queryKey: authKeys.profile(),
		queryFn: () => authService.getProfile(), // Giả sử service đã có hàm này
		staleTime: 5 * 60 * 1000, // Dữ liệu "tươi" trong 5 phút (Senior Tip: Giảm tải cho Server)
		retry: 1, // Chỉ thử lại 1 lần nếu lỗi
		...options,
	});
};
