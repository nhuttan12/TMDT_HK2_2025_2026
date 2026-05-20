import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ProductVariantRow } from '@/types/inventories/receipts/uis/ProductVariantRow';
import { getProductVariants } from '@/services/inventories/goods-receipt/product-for-goods-receipt-service';
import { PaginationResponse } from '@/types/shared/PaginationResponse';

export const useProductVariantsQuery = (): UseQueryResult<
	PaginationResponse<ProductVariantRow>,
	Error
> => {
	return useQuery({
		queryKey: ['product-variants'],
		queryFn: getProductVariants,
		staleTime: 5 * 60 * 1000,
	});
};
