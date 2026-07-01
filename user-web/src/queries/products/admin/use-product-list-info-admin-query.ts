import { apiClient } from '@/lib/api-client';
import { ProductAdminService } from '@/services/products/admin/product-admin-service';
import { PaginationParams } from '@/types/common/Pagination';
import { ProductListInfoAdmin } from '@/types/products/admin/ProductListInfoAdmin';
import { BackendPagedResult } from '@/types/products/user/productBE';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export function useProductListInfoAdminQuery(
	initialData?: BackendPagedResult<ProductListInfoAdmin>,
	params?: PaginationParams,
): UseQueryResult<BackendPagedResult<ProductListInfoAdmin>, Error> {
	const productAdminService = new ProductAdminService(apiClient);

	return useQuery({
		queryKey: ['product-list-info-admin', params?.pageNumber, params?.pageSize],
		queryFn: () =>
			productAdminService.getProductListInfoAdmin({
				pageNumber: params?.pageNumber,
				pageSize: params?.pageSize,
			}),
		// Lấy data từ Server làm vốn ban đầu
		initialData: initialData?.pageNumber === params?.pageNumber ? initialData : undefined,
		// Sau đó nó sẽ tự động chạy ngầm để lấy data mới nhất (nếu cần)
		staleTime: 1000 * 60 * 5, // Dữ liệu cũ sau 5 phút
	});
}
