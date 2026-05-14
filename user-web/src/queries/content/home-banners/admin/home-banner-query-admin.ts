import { SortableImageForm } from '@/types/images/admin/SortableImageForm';
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query';
import {
	getHomeBannersAdmin,
	updateHomeBannersAdmin,
} from '@/services/contents/home-banners/admin/home-banner-service-admin';
import { UpdateHomeBannerPayload } from '@/types/shops/admin/UpdateHomeBannerPayload';

export function useHomeBannersQueryAdmin(
	initialData: SortableImageForm[],
): UseQueryResult<SortableImageForm[], Error> {
	return useQuery({
		queryKey: ['home-banners-admin'],
		queryFn: getHomeBannersAdmin,
		initialData, // Nhận data từ Server Component để hydrate, không cần loading state ban đầu
		staleTime: 1000 * 60 * 5, // Cache trong 5 phút
	});
}

export function useUpdateHomeBannersAdminMutation(): UseMutationResult<
	void,
	Error,
	UpdateHomeBannerPayload[]
> {
	return useMutation({
		mutationFn: updateHomeBannersAdmin,
	});
}
