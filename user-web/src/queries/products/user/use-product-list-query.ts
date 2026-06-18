import { getProductListPaging } from '@/services/products/user/product-service';
import { ProductUserCard } from '@/types/products/user/ProductUserCard';
import { PaginationRequest } from '@/types/shared/PaginationRequest';
import { PaginationResponse } from '@/types/shared/PaginationResponse';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export function useProductListQuery(
	initialData?: PaginationResponse<ProductUserCard>,
	request?: PaginationRequest,
): UseQueryResult<PaginationResponse<ProductUserCard>, Error> {
	return useQuery({
		queryKey: ['home-products'],
		queryFn: () => getProductListPaging({ page: request?.page, limit: request?.limit }),
		initialData: initialData,
		staleTime: 1000 * 60 * 5, // Cache dữ liệu trong 5 phút để tối ưu performance
	});
}
