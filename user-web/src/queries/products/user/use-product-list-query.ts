import { getPageProducts } from '@/services/products/user/product-service';
import { ProductUserCard } from '@/types/products/user/ProductUserCard';
import { PaginationRequest } from '@/types/shared/PaginationRequest';
import { PaginationResponse } from '@/types/shared/PaginationResponse';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { PaginationParams } from '@/types/common/Pagination';

export function useProductListQuery(
	initialData?: PaginationResponse<ProductUserCard>,
	request?: PaginationRequest,
): UseQueryResult<PaginationResponse<ProductUserCard>, Error> {
	const pageRequest: PaginationParams = {
		pageSize : request?.limit ,
		pageNumber: request?.page
	}
	return useQuery({
		queryKey: ['home-products'],
		queryFn: () => getPageProducts(pageRequest),
		initialData: initialData,
		staleTime: 1000 * 60 * 5, // Cache dữ liệu trong 5 phút để tối ưu performance
	});
}
