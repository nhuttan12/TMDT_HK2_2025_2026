import { apiClient } from '@/lib/api-client';
import { ProductAdminService } from '@/services/products/admin/product-admin-service';
import { ProductDetailInfoAdmin } from '@/types/products/admin/ProductDetailInfoAdmin';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export function useProductDetailAdminQuery(
	productId: string,
	initialData: ProductDetailInfoAdmin,
): UseQueryResult<ProductDetailInfoAdmin> {
	const productAdminService = new ProductAdminService(apiClient);

	return useQuery({
		queryKey: ['product-detail-admin', productId],
		queryFn: (): Promise<ProductDetailInfoAdmin> => productAdminService.getProductDetailAdminByProductId(productId),
		initialData: initialData,
		enabled: !!productId,
	});
}
