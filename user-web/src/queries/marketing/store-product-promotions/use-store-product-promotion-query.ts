import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { StoreProductPromotion } from '@/types/marketing/store-product-promotions/StoreProductPromotion';
import {
	getStoreProductPromotions
} from '@/services/marketing/store-product-promotions/store-product-promotion-service';

export function useStoreProductPromotionQuery(
	initialData: StoreProductPromotion[],
): UseQueryResult<StoreProductPromotion[]> {
	return useQuery({
		// Đặt tên key rõ ràng để dễ dàng invalidate sau này
		queryKey: ['store-product-promotions'],
		// Truyền thẳng hàm service vào queryFn
		queryFn: (): Promise<StoreProductPromotion[]> => getStoreProductPromotions(),
		// Dùng initialData từ Server Component làm mồi (hydration)
		initialData: initialData,
	});
}
