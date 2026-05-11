'use client';

import {
	QueryClient,
	useMutation,
	UseMutationResult,
	useQuery,
	useQueryClient,
	UseQueryResult,
} from '@tanstack/react-query';
import {
	getShopProfileByUserId,
	updateShopProfile,
} from '@/services/shops/admin/shop-admin-service';
import { ShopProfile } from '@/types/shops/admin/ShopProfile';

// Hook lấy dữ liệu
export function useShopProfile(
	userId: number,
	initialData?: ShopProfile,
): UseQueryResult<ShopProfile, Error> {
	return useQuery({
		queryKey: ['shop-profile', userId],
		queryFn: () => getShopProfileByUserId(userId),
		initialData: initialData, // Sử dụng dữ liệu từ Server truyền xuống
		staleTime: 1000 * 60 * 5, // Cache trong 5 phút
	});
}

// Hook cập nhật dữ liệu
export function useUpdateShopProfile(): UseMutationResult<ShopProfile, Error, ShopProfile> {
	const queryClient: QueryClient = useQueryClient();

	return useMutation({
		mutationFn: updateShopProfile,
		onSuccess: (data: ShopProfile): void => {
			// Cập nhật lại cache ngay lập tức sau khi sửa thành công
			queryClient.setQueryData(['shop-profile'], data);
		},
	});
}
