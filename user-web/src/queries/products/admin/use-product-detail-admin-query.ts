import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ProductDetailInfoAdmin } from '@/types/products/admin/ProductDetailInfoAdmin';
import { getProductDetailAdminByProductId } from '@/services/products/admin/product-admin-service';

export function useProductDetailAdminQuery(
	productId: string,
	initialData: ProductDetailInfoAdmin,
): UseQueryResult<ProductDetailInfoAdmin> {
	return useQuery({
		queryKey: ['product-detail-admin', productId],
		queryFn: (): Promise<ProductDetailInfoAdmin> => getProductDetailAdminByProductId(productId),
		initialData: initialData,
		enabled: !!productId,
	});
}
