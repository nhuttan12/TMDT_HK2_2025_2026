import { SortableImageForm } from '@/types/images/admin/SortableImageForm';
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query';
import {
	fetchShopBanners,
	updateShopBanners,
} from '@/services/contents/banners/banner-service';
import { UpdateBannerPayload } from '@/types/shops/UpdateBannerPayload';

export function useShopBannersQuery(
	initialData: SortableImageForm[],
): UseQueryResult<SortableImageForm[], Error> {
	return useQuery({
		queryKey: ['shop-banners'],
		queryFn: fetchShopBanners,
		initialData, // Nhận data từ Server Component để hydrate, không cần loading state ban đầu
		staleTime: 1000 * 60 * 5, // Cache trong 5 phút
	});
}

export function useUpdateShopBannersMutation(): UseMutationResult<
	void,
	Error,
	UpdateBannerPayload[]
> {
	return useMutation({
		mutationFn: updateShopBanners,
	});
}
