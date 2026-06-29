import { apiClient } from '@/lib/api-client';
import { GoodsStockService } from '@/services/inventories/stocks/goods-stock-service';
import { GoodsStockApiData } from '@/types/inventories/stocks/GoodsStockApiData';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export function useGoodsStockSummaryQuery(
	initialData?: GoodsStockApiData,
): UseQueryResult<GoodsStockApiData, Error> {
    const goodsStockService = new GoodsStockService(apiClient);

	return useQuery({
		queryKey: ['goods-stock-summary'],
		queryFn: ()=> goodsStockService.getGoodsStockSummary(),
		// Lấy data từ Server làm vốn ban đầu
		initialData: initialData,
		// Sau đó nó sẽ tự động chạy ngầm để lấy data mới nhất (nếu cần)
		staleTime: 1000 * 60 * 5, // Dữ liệu cũ sau 5 phút
	});
}
