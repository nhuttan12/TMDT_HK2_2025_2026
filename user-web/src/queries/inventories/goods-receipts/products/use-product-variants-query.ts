import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ProductVariantRow } from '@/types/inventories/receipts/uis/ProductVariantRow';
import { getProductVariants } from '@/services/inventories/goods-receipt/product-for-goods-receipt-service';

export const useProductVariantsQuery = (): UseQueryResult<ProductVariantRow[], Error> => {
	return useQuery({
		queryKey: ['product-variants'],
		queryFn: getProductVariants,
		staleTime: 5 * 60 * 1000,
	});
};
