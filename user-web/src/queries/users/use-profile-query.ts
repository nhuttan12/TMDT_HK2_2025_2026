import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { UserProfileInfo } from '@/types/users/user/UserProfileInfo';
import { getUserProfile } from '@/services/users/user/profile-service';

export function useProfileQuery(
	userId: number,
	initialData?: UserProfileInfo,
): UseQueryResult<UserProfileInfo, Error> {
	return useQuery({
		queryKey: ['user-profile', userId],
		queryFn: (): Promise<UserProfileInfo> => getUserProfile(userId),
		initialData: initialData,
		enabled: userId > 0,
		staleTime: 1000 * 60 * 10, // Dữ liệu profile ít thay đổi, có thể cache lâu hơn (10 phút)
	});
}
