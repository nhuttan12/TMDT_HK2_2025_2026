import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { CategoryListItemAdmin } from '@/types/categories/admin/CategoryListItemAdmin';
import { getAdminCategories } from '@/services/categories/admin/category-admin-service';

export function useCategoryAdminQuery(
	initialData?: CategoryListItemAdmin[],
): UseQueryResult<CategoryListItemAdmin[], Error> {
	return useQuery({
		queryKey: ['admin-categories'],
		queryFn: getAdminCategories,
		initialData: initialData,
		staleTime: 1000 * 60 * 5, // Cache trong 5 phút
	});
}
