import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ProductVariantRow } from '@/types/inventories/receipts/uis/ProductVariantRow';
import { getProductVariantListForSelectionGoodsReceiptMocking } from '@/services/inventories/goods-receipt/product-for-goods-receipt-selection-service';
import { PaginationResponse } from '@/types/shared/PaginationResponse';

export const useProductVariantsQuery = (): UseQueryResult<
	PaginationResponse<ProductVariantRow>,
	Error
> => {
	return useQuery({
		queryKey: ['product-variants'],
		queryFn: getProductVariantListForSelectionGoodsReceiptMocking,
		staleTime: 5 * 60 * 1000,
	});
};
