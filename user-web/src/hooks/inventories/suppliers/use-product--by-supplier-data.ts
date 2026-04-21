import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getProductBySupplierId } from '@/services/inventories/suppliers/goods-supplier-service';
import { ProductListInfoAdmin } from '@/types/products/admin/ProductListInfoAdmin';

export function useProductBySupplierData(
	supplierId: number,
	initialData?: ProductListInfoAdmin[],
): UseQueryResult<ProductListInfoAdmin[], Error> {
	return useQuery({
		queryKey: ['supplier-products', supplierId],
		queryFn: (): Promise<ProductListInfoAdmin[]> => getProductBySupplierId(supplierId),
		// Lấy data từ Server làm vốn ban đầu
		initialData: initialData,
		// Sau đó nó sẽ tự động chạy ngầm để lấy data mới nhất (nếu cần)
		staleTime: 1000 * 60 * 5, // Dữ liệu cũ sau 5 phút
	});
}
