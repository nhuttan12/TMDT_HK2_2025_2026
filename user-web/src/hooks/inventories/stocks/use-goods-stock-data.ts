import { GoodsStockSummaryItem } from '@/types/inventories/stocks/GoodsStockSummaryItem';
import { useQuery } from '@tanstack/react-query';
import { fetchGoodsStockData } from '@/services/inventories/goods-stock-service';

export function useGoodsStockData(initialData?: GoodsStockSummaryItem[]) {
	return useQuery({
		queryKey: ['goods-stock-summary'],
		queryFn: fetchGoodsStockData,
		// Lấy data từ Server làm vốn ban đầu
		initialData: initialData,
		// Sau đó nó sẽ tự động chạy ngầm để lấy data mới nhất (nếu cần)
		staleTime: 1000 * 60 * 5, // Dữ liệu cũ sau 5 phút
	});
}
