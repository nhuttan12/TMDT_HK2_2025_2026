import {
	QueryClient,
	useMutation,
	UseMutationResult,
	useQuery,
	useQueryClient,
	UseQueryResult,
} from '@tanstack/react-query';
import { UpdatePopupPayload } from '@/types/shops/admin/UpdatePopupPayload';
import { fetchShopPopup, updateShopPopup } from '@/services/contents/popups/popup-service';
import { Popup } from '@/types/shops/admin/Popup';

export const SHOP_POPUP_QUERY_KEY: string[] = ['shop-popup'];

export function useShopPopupQuery(initialData?: Popup): UseQueryResult<Popup | undefined, Error> {
	return useQuery({
		queryKey: SHOP_POPUP_QUERY_KEY,
		queryFn: fetchShopPopup, // Hàm service gọi API GET
		initialData,
		staleTime: 1000 * 60 * 5,
	});
}

export function useUpdateShopPopupMutation(): UseMutationResult<void, Error, UpdatePopupPayload> {
	const queryClient: QueryClient = useQueryClient();

	return useMutation({
		mutationFn: updateShopPopup, // Hàm service gọi API PUT/POST
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: SHOP_POPUP_QUERY_KEY });
		},
	});
}
