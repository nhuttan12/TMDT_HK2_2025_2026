import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { GoodsReceiptDetail } from '@/types/inventories/receipts/uis/GoodsReceiptDetail';
import { getGoodsReceiptById } from '@/services/inventories/goods-receipt/goods-receipt-detail-service';

export interface UseGoodsReceiptDetailQueryProps {
	id: number;
	initialData?: GoodsReceiptDetail;
}

export const useGoodsReceiptDetailQuery = ({
	id,
	initialData,
}: UseGoodsReceiptDetailQueryProps): UseQueryResult<GoodsReceiptDetail, Error> => {
	return useQuery({
		// Bắt buộc phải có id trong queryKey để cache không bị nhầm lẫn giữa các phiếu nhập khác nhau
		queryKey: ['goods-receipt-detail', id],
		queryFn: (): Promise<GoodsReceiptDetail> => getGoodsReceiptById(id),
		initialData: initialData,
		enabled: id !== 0,
	});
};
