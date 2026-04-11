import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchProductInStock } from '@/services/inventories/stocks/goods-stock-service';
import { ProductInStock } from '@/types/inventories/stocks/ProductInStock';

export function useProductInStockData(
	initialData?: ProductInStock[],
): UseQueryResult<ProductInStock[], Error> {
	return useQuery({
		queryKey: ['product-in-stock'],
		queryFn: fetchProductInStock,
		// Lấy data từ Server làm vốn ban đầu
		initialData: initialData,
		// Sau đó nó sẽ tự động chạy ngầm để lấy data mới nhất (nếu cần)
		staleTime: 1000 * 60 * 5, // Dữ liệu cũ sau 5 phút
	});
}
