import { apiClient } from '@/lib/api-client';
import {
    GoodsReceiptService
} from '@/services/inventories/goods-receipt/goods-receipt-service';
import { GoodsReceiptList } from '@/types/inventories/receipts/uis/GoodsReceiptList';
import { BackendPagedResult } from '@/types/products/user/productBE';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export interface UseGoodsReceiptsQueryProps {
	initialData?: BackendPagedResult<GoodsReceiptList>;
}

export const useGoodsReceiptsQuery = ({
	initialData,
}: UseGoodsReceiptsQueryProps): UseQueryResult<BackendPagedResult<GoodsReceiptList>, Error> => {
	const goodsService = new GoodsReceiptService(apiClient);

	return useQuery({
		queryKey: ['goods-receipts-list'],
		queryFn: () => goodsService.getGoodsReceiptList(),
		initialData: initialData, // Sử dụng dữ liệu từ Server Component ném xuống để SSR
	});
};
