import { apiClient } from '@/lib/api-client';
import { ProductForGoodsReceiptService } from '@/services/inventories/goods-receipt/product-for-goods-receipt-selection-service';
import { ProductForGoodsReceipt } from '@/types/inventories/receipts/uis/ProductForGoodsReceipt';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const useProductsForGoodsReceiptQuery = (): UseQueryResult<ProductForGoodsReceipt[], Error> => {
	const productForGoodsReceiptService = new ProductForGoodsReceiptService(apiClient);

    return useQuery({
		// queryKey định danh cache cho query này
		queryKey: ['products-for-goods-receipt'],
		queryFn: () => productForGoodsReceiptService.getProductsSelectionForGoodsReceipt(),
		// Có thể cấu hình thêm staleTime nếu dữ liệu sản phẩm ít thay đổi
		staleTime: 5 * 60 * 1000, // 5 phút
	});
};
