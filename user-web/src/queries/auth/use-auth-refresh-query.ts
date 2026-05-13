import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { authService, RefreshTokenResponse } from '@/services/auth/authService';
import { authKeys } from '@/queries/auth/auth-key';

export const useAuthRefreshQuery = (): UseQueryResult<RefreshTokenResponse, Error> => {
	console.log('useAuthRefreshQuery')
	return useQuery({
		queryKey: authKeys.refreshToken(),
		queryFn: authService.refreshToken,
		staleTime: 30 * 60 * 1000, // 15 phút
		retry: false,
	});
};
