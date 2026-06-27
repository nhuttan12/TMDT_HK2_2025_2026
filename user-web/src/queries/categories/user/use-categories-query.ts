'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { CategoryItem } from '@/types/categories/user/CategoryItem';
import { getCategories, getCategoriesCraw } from '@/services/categories/user/category-service';

export function useCategoriesQuery(
	initialData?: CategoryItem[],
): UseQueryResult<CategoryItem[], Error> {
	return useQuery<CategoryItem[], Error>({
		queryKey: ['categories'],
		queryFn: getCategories,

		// Hỗ trợ SSR Hydration từ Server Component
		initialData: initialData,

		// Cấu hình tối ưu: Danh mục hệ thống rất ít khi thay đổi (Static Data)
		// Set staleTime cao (ví dụ: 10 phút) để tránh việc gọi lại API liên tục khi user chuyển tab
		staleTime: 1000 * 60 * 10,
	});
}
