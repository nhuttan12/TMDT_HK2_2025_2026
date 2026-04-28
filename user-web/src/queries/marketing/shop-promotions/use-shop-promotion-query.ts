import { ShopPromotion } from '@/types/marketing/shop-promotions/ShopPromotion';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getShopPromotions } from '@/services/marketing/shop-promotions/shop-promotion-service';

export function useShopPromotionQuery(
	initialData: ShopPromotion[],
): UseQueryResult<ShopPromotion[]> {
	return useQuery({
		queryKey: ['shop-promotions'],
		queryFn: (): Promise<ShopPromotion[]> => getShopPromotions(),
		initialData: initialData,
	});
}
