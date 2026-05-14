'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getTopSellingProducts } from '@/services/products/user/product-service';
import { ProductUserCard } from '@/types/products/user/ProductUserCard';

export function useTopSellingProductsQuery(
	initialData?: ProductUserCard[],
): UseQueryResult<ProductUserCard[], Error> {
	return useQuery<ProductUserCard[], Error>({
		queryKey: ['top-selling-products'],
		queryFn: getTopSellingProducts,
		initialData: initialData,
		staleTime: 1000 * 60 * 5, // Cache 5 phút
	});
}
