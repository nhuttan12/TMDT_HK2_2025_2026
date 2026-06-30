import { apiClient } from '@/lib/api-client';
import {
    GoodsReceiptDetailService
} from '@/services/inventories/goods-receipt/goods-receipt-detail-service';
import { GoodsReceiptDetail } from '@/types/inventories/receipts/uis/GoodsReceiptDetail';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export interface UseGoodsReceiptDetailQueryProps {
	id: string;
	initialData?: GoodsReceiptDetail;
}

export const useGoodsReceiptDetailQuery = ({
	id,
	initialData,
}: UseGoodsReceiptDetailQueryProps): UseQueryResult<GoodsReceiptDetail, Error> => {
	const goodsReceiptDetailService = new GoodsReceiptDetailService(apiClient);

	return useQuery({
		// Bắt buộc phải có id trong queryKey để cache không bị nhầm lẫn giữa các phiếu nhập khác nhau
		queryKey: ['goods-receipt-detail', id],
		queryFn: (): Promise<GoodsReceiptDetail> =>
			goodsReceiptDetailService.getGoodsReceiptDetailByReceiptId(id),
		initialData: initialData,
		enabled: !!id,
	});
};
