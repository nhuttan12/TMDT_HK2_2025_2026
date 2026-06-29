import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ProductListInfoAdmin } from '@/types/products/admin/ProductListInfoAdmin';
import { getProductListInfoAdmin } from '@/services/products/admin/product-admin-service';
import { PaginationRequest } from '@/types/shared/PaginationRequest';
import { BackendPagedResult } from '@/types/products/user/productBE';

export function useProductListInfoAdminQuery(
	initialData?: BackendPagedResult<ProductListInfoAdmin>,
	request?: PaginationRequest,
): UseQueryResult<BackendPagedResult<ProductListInfoAdmin>, Error> {
	return useQuery({
		queryKey: ['product-list-info-admin'],
		queryFn: () => getProductListInfoAdmin({ page: request?.page, limit: request?.limit }),
		// Lấy data từ Server làm vốn ban đầu
		initialData: initialData,
		// Sau đó nó sẽ tự động chạy ngầm để lấy data mới nhất (nếu cần)
		staleTime: 1000 * 60 * 5, // Dữ liệu cũ sau 5 phút
	});
}
