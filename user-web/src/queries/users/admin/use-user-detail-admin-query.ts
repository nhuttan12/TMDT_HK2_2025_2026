import { UserDetailInfoAdmin } from '@/types/users/admin/UserDetailInfoAdmin';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getUserDetailAdminById } from '@/services/users/admin/user-service';

export function useUserDetailAdminQuery(
	userId: string,
	initialData: UserDetailInfoAdmin,
): UseQueryResult<UserDetailInfoAdmin> {
	return useQuery({
		queryKey: ['user-detail-admin', userId],
		queryFn: (): Promise<UserDetailInfoAdmin> => getUserDetailAdminById(userId),
		initialData: initialData,
		enabled: !!userId, // Không gọi API nếu userId = 0 (Mode Create)
	});
}
