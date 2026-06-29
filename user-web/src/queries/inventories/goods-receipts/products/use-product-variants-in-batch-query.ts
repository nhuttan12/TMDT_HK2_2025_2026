import { apiClient } from '@/lib/api-client';
import {
    ProductForGoodsReceiptService
} from '@/services/inventories/goods-receipt/product-for-goods-receipt-selection-service';
import { ProductVariantRow } from '@/types/inventories/receipts/uis/ProductVariantRow';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const useProductVariantsInBatchQuery = (
	productId: string,
): UseQueryResult<ProductVariantRow[], Error> => {
	const productForGoodsReceiptService = new ProductForGoodsReceiptService(apiClient);

	return useQuery({
		queryKey: ['product-variants'],
		queryFn: () =>
			productForGoodsReceiptService.getProductVariantListForSelectionGoodsReceipt(productId),
		staleTime: 5 * 60 * 1000,
	});
};
