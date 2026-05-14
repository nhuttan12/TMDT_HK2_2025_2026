import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ShopProductPromotion } from '@/types/marketing/shop-promotions/ShopProductPromotion';
import {
	getStoreProductPromotions
} from '@/services/marketing/shop-promotions/shop-product-promotion-service';

export function useShopProductPromotionQuery(
	promotionId: number,
	initialData: ShopProductPromotion[],
): UseQueryResult<ShopProductPromotion[]> {
	return useQuery({
		// Đặt tên key rõ ràng để dễ dàng invalidate sau này
		queryKey: ['shop-product-promotions', promotionId],
		// Truyền thẳng hàm service vào queryFn
		queryFn: (): Promise<ShopProductPromotion[]> => getStoreProductPromotions(promotionId),
		// Dùng initialData từ Server Component làm mồi (hydration)
		initialData: initialData,
		// Chặn gọi API nếu promotionId không hợp lệ
		enabled: !!promotionId,
	});
}
