import { GoodsStockSummaryItem } from '@/types/inventories/stocks/GoodsStockSummaryItem';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getGoodsStockSummary } from '@/services/inventories/stocks/goods-stock-service';

export function useGoodsStockSummaryQuery(
	initialData?: GoodsStockSummaryItem[],
): UseQueryResult<GoodsStockSummaryItem[], Error> {
	return useQuery({
		queryKey: ['goods-stock-summary'],
		queryFn: getGoodsStockSummary,
		// Lấy data từ Server làm vốn ban đầu
		initialData: initialData,
		// Sau đó nó sẽ tự động chạy ngầm để lấy data mới nhất (nếu cần)
		staleTime: 1000 * 60 * 5, // Dữ liệu cũ sau 5 phút
	});
}
