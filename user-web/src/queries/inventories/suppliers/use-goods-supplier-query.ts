import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Supplier } from '@/types/inventories/suppliers/Supplier';
import { getGoodsSupplier } from '@/services/inventories/suppliers/goods-supplier-service';

export function useGoodsSupplierQuery(initialData?: Supplier[]): UseQueryResult<Supplier[], Error> {
	return useQuery({
		queryKey: ['goods-supplier'],
		queryFn: getGoodsSupplier,
		// Lấy data từ Server làm vốn ban đầu
		initialData: initialData,
		// Sau đó nó sẽ tự động chạy ngầm để lấy data mới nhất (nếu cần)
		staleTime: 1000 * 60 * 5, // Dữ liệu cũ sau 5 phút
	});
}
