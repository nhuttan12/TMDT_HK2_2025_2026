import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ProductListInfoAdmin } from '@/types/products/admin/ProductListInfoAdmin';
import { getProductListInfoAdmin } from '@/services/products/admin/product-admin-service';
import { PaginationResponse } from '@/types/shared/PaginationResponse';
import { PaginationRequest } from '@/types/shared/PaginationRequest';

export function useProductListInfoAdminQuery(
	initialData?: PaginationResponse<ProductListInfoAdmin>,
	request?: PaginationRequest,
): UseQueryResult<PaginationResponse<ProductListInfoAdmin>, Error> {
	return useQuery({
		queryKey: ['product-list-info-admin'],
		queryFn: () => getProductListInfoAdmin({ page: request?.page, limit: request?.limit }),
		// Lấy data từ Server làm vốn ban đầu
		initialData: initialData,
		// Sau đó nó sẽ tự động chạy ngầm để lấy data mới nhất (nếu cần)
		staleTime: 1000 * 60 * 5, // Dữ liệu cũ sau 5 phút
	});
}
