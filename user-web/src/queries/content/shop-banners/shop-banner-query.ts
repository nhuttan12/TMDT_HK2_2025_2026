import {
	useQuery,
	useMutation,
	UseQueryResult,
	UseMutationResult,
	useQueryClient,
	QueryClient,
} from '@tanstack/react-query';
import { SortableImageForm } from '@/types/images/admin/SortableImageForm';
import {
	getShopBanners,
	updateShopBanners,
} from '@/services/contents/shop-banners/shop-banner-service';
import { UpdateShopBannerPayload } from '@/types/shops/admin/UpdateShopBannerPayload';

export const SHOP_SLIDER_QUERY_KEY: string[] = ['shop-banners'];

export function useShopBannersQuery(
	initialData: SortableImageForm[],
): UseQueryResult<SortableImageForm[], Error> {
	return useQuery({
		queryKey: SHOP_SLIDER_QUERY_KEY,
		queryFn: getShopBanners,
		initialData,
		staleTime: 1000 * 60 * 5,
	});
}

export function useUpdateShopBannerMutation(): UseMutationResult<
	void,
	Error,
	UpdateShopBannerPayload[]
> {
	const queryClient: QueryClient = useQueryClient();

	return useMutation({
		mutationFn: updateShopBanners,
		onSuccess: () => {
			// Tự động invalidate data cũ để fetch lại data mới sau khi lưu thành công
			queryClient.invalidateQueries({ queryKey: SHOP_SLIDER_QUERY_KEY });
		},
	});
}
