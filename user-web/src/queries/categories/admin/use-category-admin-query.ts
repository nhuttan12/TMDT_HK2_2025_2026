import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { CategoryListItemAdmin } from '@/types/categories/admin/CategoryListItemAdmin';
import { getAdminCategories } from '@/services/categories/admin/category-admin-service';
import { PaginationResponse } from '@/types/shared/PaginationResponse';
import { PaginationRequest } from '@/types/shared/PaginationRequest';

export function useCategoryAdminQuery(
    initialData?: PaginationResponse<CategoryListItemAdmin>,
    request?: PaginationRequest
): UseQueryResult<PaginationResponse<CategoryListItemAdmin>, Error> {
	return useQuery({
		queryKey: ['admin-categories'],
		queryFn: () => getAdminCategories({ page: request?.page, limit: request?.limit }),
		initialData: initialData,
		staleTime: 1000 * 60 * 5, // Cache trong 5 phút
	});
}
