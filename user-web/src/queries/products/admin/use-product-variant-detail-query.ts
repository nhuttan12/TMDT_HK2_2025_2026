import { ProductVariantDetail } from '@/types/products/admin/variant/ProductVariantDetail';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getProductVariantDetailById } from '@/services/products/admin/product-variant-service';

export function useProductVariantDetailQuery(
	id: number,
	initialData: ProductVariantDetail,
): UseQueryResult<ProductVariantDetail> {
	return useQuery({
		queryKey: ['product-variant-detail', id],
		queryFn: (): Promise<ProductVariantDetail> => getProductVariantDetailById(id),
		initialData: initialData,
		// Chỉ kích hoạt query nếu id hợp lệ (hữu ích để chặn fetch thừa khi ở mode 'create' với id = 0)
		enabled: !!id,
	});
}
