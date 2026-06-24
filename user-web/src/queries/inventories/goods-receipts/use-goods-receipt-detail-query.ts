import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { GoodsReceiptDetail } from '@/types/inventories/receipts/uis/GoodsReceiptDetail';
import { getGoodsReceiptDetailByReceiptId } from '@/services/inventories/goods-receipt/goods-receipt-detail-service';

export interface UseGoodsReceiptDetailQueryProps {
	id: string;
	initialData?: GoodsReceiptDetail;
}

export const useGoodsReceiptDetailQuery = ({
	id,
	initialData,
}: UseGoodsReceiptDetailQueryProps): UseQueryResult<GoodsReceiptDetail, Error> => {
	return useQuery({
		// Bắt buộc phải có id trong queryKey để cache không bị nhầm lẫn giữa các phiếu nhập khác nhau
		queryKey: ['goods-receipt-detail', id],
		queryFn: (): Promise<GoodsReceiptDetail> => getGoodsReceiptDetailByReceiptId(id),
		initialData: initialData,
		enabled: !!id,
	});
};
