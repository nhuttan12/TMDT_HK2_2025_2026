import { ProductUserCard } from '@/types/products/user/ProductUserCard';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getProductsHome } from '@/services/products/user/product-service';

export function useProductsHomeQuery(
	initialData?: ProductUserCard[],
): UseQueryResult<ProductUserCard[], Error> {
	return useQuery({
		queryKey: ['home-products'],
		queryFn: getProductsHome,
		initialData: initialData,
		staleTime: 1000 * 60 * 5, // Cache dữ liệu trong 5 phút để tối ưu performance
	});
}
