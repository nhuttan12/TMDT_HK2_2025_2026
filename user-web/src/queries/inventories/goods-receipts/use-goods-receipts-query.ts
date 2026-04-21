import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { GoodsReceiptList } from '@/types/inventories/receipts/uis/GoodsReceiptList';
import { getGoodsReceipts } from '@/services/inventories/goods-receipt/goods-receipt-service';

export interface UseGoodsReceiptsQueryProps {
	initialData?: GoodsReceiptList[];
}

export const useGoodsReceiptsQuery = ({
	initialData,
}: UseGoodsReceiptsQueryProps): UseQueryResult<GoodsReceiptList[], Error> => {
	return useQuery({
		queryKey: ['goods-receipts-list'],
		queryFn: getGoodsReceipts,
		initialData: initialData, // Sử dụng dữ liệu từ Server Component ném xuống để SSR
	});
};
