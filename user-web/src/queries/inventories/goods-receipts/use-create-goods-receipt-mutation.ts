import { apiClient } from '@/lib/api-client';
import { GoodsReceiptService } from '@/services/inventories/goods-receipt/goods-receipt-service';
import { CreateGoodsReceiptRequest } from '@/types/inventories/receipts/dtos/CreateGoodsReceiptRequest';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateGoodsReceiptMutation() {
	const queryClient = useQueryClient();
	const goodsReceiptService = new GoodsReceiptService(apiClient);

	return useMutation({
		// 1. Nhận payload và truyền xuống Service
		mutationFn: (payload: CreateGoodsReceiptRequest) =>
			goodsReceiptService.createGoodsReceipt(payload),

		onSuccess: (newReceiptId) => {
			if (newReceiptId) {
				// 2. Làm mới danh sách phiếu nhập kho ngay khi tạo thành công
				queryClient.invalidateQueries({ queryKey: ['goods-receipt-list'] });
			}
		},
		onError: (error) => {
			console.error('Lỗi khi tạo phiếu nhập kho:', error);
		},
	});
}
