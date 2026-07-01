import { apiClient } from '@/lib/api-client';
import { UserAdminService } from '@/services/users/admin/user-service';
import { UserDetailInfoAdmin } from '@/types/users/admin/UserDetailInfoAdmin';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export function useUserDetailAdminQuery(
	userId: string,
	initialData: UserDetailInfoAdmin,
): UseQueryResult<UserDetailInfoAdmin> {
	const userAdminService = new UserAdminService(apiClient);

	return useQuery({
		queryKey: ['user-detail-admin', userId],
		queryFn: (): Promise<UserDetailInfoAdmin> => userAdminService.getUserDetailAdminById(userId),
		initialData: initialData,
		enabled: !!userId, // Không gọi API nếu userId = 0 (Mode Create)
	});
}
