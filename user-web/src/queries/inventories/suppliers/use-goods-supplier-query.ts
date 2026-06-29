import { apiClient } from '@/lib/api-client';
import { GoodsSupplierService } from '@/services/inventories/suppliers/goods-supplier-service';
import { Supplier } from '@/types/inventories/suppliers/Supplier';
import { BackendPagedResult } from '@/types/products/user/productBE';
import { PaginationRequest } from '@/types/shared/PaginationRequest';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export function useGoodsSupplierQuery(
	initialData?: BackendPagedResult<Supplier>,
	{ page = 1, limit = 10 }: PaginationRequest = {},
): UseQueryResult<BackendPagedResult<Supplier>, Error> {
	const goodsSupplierService = new GoodsSupplierService(apiClient);
	return useQuery({
		queryKey: ['goods-supplier'],
		queryFn: () => goodsSupplierService.getGoodsSupplierListPaging({ page, limit }),
		// Lấy data từ Server làm vốn ban đầu
		initialData: initialData,
		// Sau đó nó sẽ tự động chạy ngầm để lấy data mới nhất (nếu cần)
		staleTime: 1000 * 60 * 5, // Dữ liệu cũ sau 5 phút
	});
}
