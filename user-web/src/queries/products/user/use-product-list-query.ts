import { getProductFilter } from '@/services/products/user/product-service';
import { PaginationParams } from '@/types/common/Pagination';
import { ProductFilterPayload } from '@/types/products/user/ProductFilterPayload';
import { ProductUserCard } from '@/types/products/user/ProductUserCard';
import { PaginationRequest } from '@/types/shared/PaginationRequest';
import { PaginationResponse } from '@/types/shared/PaginationResponse';
import { keepPreviousData, useQuery, UseQueryResult } from '@tanstack/react-query';

export function useProductListQuery(
	initialData?: PaginationResponse<ProductUserCard>,
	pagination?: PaginationRequest,
	filter?: ProductFilterPayload,
): UseQueryResult<PaginationResponse<ProductUserCard>, Error> {
	const pageRequest: PaginationParams = {
		pageSize: pagination?.limit,
		pageNumber: pagination?.page,
	};

    // KIỂM TRA: Chỉ coi là lần tải đầu tiên nếu ở Trang 1 và Không áp dụng bộ lọc nào cả
	const isFirstInitialLoad = (!pagination || pagination.page === 1) && 
		(!filter || Object.keys(filter).length === 0);

	return useQuery({
		queryKey: ['home-products', pageRequest, filter],
		queryFn: () => getProductFilter(filter, pageRequest),
		initialData: isFirstInitialLoad ? initialData : undefined,
		staleTime: 1000 * 60 * 5, // Cache dữ liệu trong 5 phút để tối ưu performance
        placeholderData: keepPreviousData,
	});
}
