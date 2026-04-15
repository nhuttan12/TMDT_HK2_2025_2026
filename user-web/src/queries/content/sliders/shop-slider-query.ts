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
	fetchShopSliders,
	updateShopSliders,
} from '@/services/contents/sliders/slider-service';
import { UpdateSliderPayload } from '@/types/shops/UpdateSliderPayload';

export const SHOP_SLIDER_QUERY_KEY: string[] = ['shop-sliders'];

export function useShopSlidersQuery(
	initialData: SortableImageForm[],
): UseQueryResult<SortableImageForm[], Error> {
	return useQuery({
		queryKey: SHOP_SLIDER_QUERY_KEY,
		queryFn: fetchShopSliders,
		initialData,
		staleTime: 1000 * 60 * 5,
	});
}

export function useUpdateShopSlidersMutation(): UseMutationResult<
	void,
	Error,
	UpdateSliderPayload[]
> {
	const queryClient: QueryClient = useQueryClient();

	return useMutation({
		mutationFn: updateShopSliders,
		onSuccess: () => {
			// Tự động invalidate data cũ để fetch lại data mới sau khi lưu thành công
			queryClient.invalidateQueries({ queryKey: SHOP_SLIDER_QUERY_KEY });
		},
	});
}
