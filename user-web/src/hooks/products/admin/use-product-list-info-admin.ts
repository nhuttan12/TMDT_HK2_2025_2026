import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ProductListInfoAdmin } from '@/types/products/admin/ProductListInfoAdmin';
import { fetchProductListInfoAdmin } from '@/services/products/admin/product-admin-service';

export function useProductListInfoAdmin(
	initialData?: ProductListInfoAdmin[],
): UseQueryResult<ProductListInfoAdmin[], Error> {
	return useQuery({
		queryKey: ['product-list-info-admin'],
		queryFn: fetchProductListInfoAdmin,
		// Lấy data từ Server làm vốn ban đầu
		initialData: initialData,
		// Sau đó nó sẽ tự động chạy ngầm để lấy data mới nhất (nếu cần)
		staleTime: 1000 * 60 * 5, // Dữ liệu cũ sau 5 phút
	});
}
