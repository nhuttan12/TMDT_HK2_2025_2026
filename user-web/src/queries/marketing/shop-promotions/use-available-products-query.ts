import { ProductPromotionForAdding } from '@/types/marketing/shop-promotions/ProductPromotionForAdding';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getAvailableProductsForPromotion } from '@/services/marketing/shop-promotions/shop-promotion-adding-service';

export function useAvailableProductsQuery(
	initialData: ProductPromotionForAdding[],
): UseQueryResult<ProductPromotionForAdding[]> {
	return useQuery({
		queryKey: ['available-products-promotion'],
		queryFn: (): Promise<ProductPromotionForAdding[]> => getAvailableProductsForPromotion(),
		initialData: initialData,
	});
}
