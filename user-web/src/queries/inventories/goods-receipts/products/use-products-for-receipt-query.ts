import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ProductForGoodsReceipt } from '@/types/inventories/receipts/uis/ProductForGoodsReceipt';
import { getProductSelectionForGoodsReceiptMocking } from '@/services/inventories/goods-receipt/product-for-goods-receipt-selection-service';

export const useProductsForGoodsReceiptQuery = (): UseQueryResult<ProductForGoodsReceipt[], Error> => {
	return useQuery({
		// queryKey định danh cache cho query này
		queryKey: ['products-for-goods-receipt'],
		queryFn: getProductSelectionForGoodsReceiptMocking,
		// Có thể cấu hình thêm staleTime nếu dữ liệu sản phẩm ít thay đổi
		staleTime: 5 * 60 * 1000, // 5 phút
	});
};
