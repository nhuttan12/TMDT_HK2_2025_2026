import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getProductInStock } from '@/services/inventories/stocks/goods-stock-service';
import { ProductInStock } from '@/types/inventories/stocks/ProductInStock';

export function useProductInStockQuery(
	initialData?: ProductInStock[],
): UseQueryResult<ProductInStock[], Error> {
	return useQuery({
		queryKey: ['product-in-stock'],
		queryFn: getProductInStock,
		// Lấy data từ Server làm vốn ban đầu
		initialData: initialData,
		// Sau đó nó sẽ tự động chạy ngầm để lấy data mới nhất (nếu cần)
		staleTime: 1000 * 60 * 5, // Dữ liệu cũ sau 5 phút
	});
}
