import { apiClient } from '@/lib/api-client';
import { GoodsStockService } from '@/services/inventories/stocks/goods-stock-service';
import { ProductInStock } from '@/types/inventories/stocks/ProductInStock';
import { BackendPagedResult } from '@/types/products/user/productBE';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export function useProductInStockQuery(
	initialData?: BackendPagedResult<ProductInStock>,
	page: number = 1,
): UseQueryResult<BackendPagedResult<ProductInStock>, Error> {
	const goodsStockService = new GoodsStockService(apiClient);
    
	return useQuery({
		queryKey: ['product-in-stock', page],
		queryFn: () => goodsStockService.getProductInStockPaging({ page }),
		// Lấy data từ Server làm vốn ban đầu
		initialData: initialData?.pageNumber === page ? initialData : undefined,
		// Sau đó nó sẽ tự động chạy ngầm để lấy data mới nhất (nếu cần)
		staleTime: 1000 * 60 * 5, // Dữ liệu cũ sau 5 phút
	});
}
