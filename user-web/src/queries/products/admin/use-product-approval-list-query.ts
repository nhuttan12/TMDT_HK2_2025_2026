import { getProductApprovalListAdmin } from '@/services/products/admin/product-admin-service';
import { ProductListInfoAdmin } from '@/types/products/admin/ProductListInfoAdmin';
import { BackendPagedResult } from '@/types/products/user/productBE';
import { PaginationRequest } from '@/types/shared/PaginationRequest';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export function useProductApprovalListQuery(
	initialData?: BackendPagedResult<ProductListInfoAdmin>,
	request?: PaginationRequest,
): UseQueryResult<BackendPagedResult<ProductListInfoAdmin>, Error> {
	return useQuery({
		queryKey: ['product-list-info-admin'],
		queryFn: () => getProductApprovalListAdmin({ page: request?.page, limit: request?.limit }),
		// Lấy data từ Server làm vốn ban đầu
		initialData: initialData,
		// Sau đó nó sẽ tự động chạy ngầm để lấy data mới nhất (nếu cần)
		staleTime: 1000 * 60 * 5, // Dữ liệu cũ sau 5 phút
	});
}
