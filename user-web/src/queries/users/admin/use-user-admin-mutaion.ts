'use client';

import { useStatusModal } from '@/hooks/share/use-status-modal';
import { apiClient } from '@/lib/api-client';
import { UserAdminService } from '@/services/users/admin/user-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUserAdminMuatation() {
	const userAdminService = new UserAdminService(apiClient);
	const queryClient = useQueryClient();

    const modal = useStatusModal();

	const mutation = useMutation({
		mutationFn: async (userId: string) => {
            // Tùy chọn: Bạn có thể hiển thị loading ngay khi bắt đầu gọi API
            modal.showLoading('Đang xử lý khóa tài khoản...');
			return await userAdminService.lockUser(userId);
		},

		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ['user-admin-list'] });
            
            // 2. Gọi modal báo thành công trong onSuccess
            modal.showSuccess(`Đã khóa tài khoản thành công!`);
			console.log(`Đã khóa tài khoản thành công: ${variables}`);
		},

		onError: (error, variables) => {
            // 3. Gọi modal báo lỗi trong onError
            modal.showError(`Lỗi khi khóa tài khoản: Vui lòng thử lại.`);
			console.error(`Lỗi khi khóa tài khoản ${variables}:`, error);
		},
	});

    // 4. Trả về CẢ mutation VÀ modal để giao diện sử dụng
    return { mutation, modal };
}
