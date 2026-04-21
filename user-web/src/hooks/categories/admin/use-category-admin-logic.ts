import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useTableSort } from '@/hooks/share/use-table-sort';
import { usePagination, UsePaginationReturn } from '@/hooks/share/use-pagination';
import { useTableSelection } from '@/hooks/share/use-table-selection';
import { CategoryAdminSortField } from '@/types/categories/admin/CategoryAdminSort';
import { CategoryListItemAdmin } from '@/types/categories/admin/CategoryListItemAdmin';
import { JSX } from 'react';

export interface CategoryAdminLogicReturn {
	// Routing Actions
	handleRedirectToAddNew: () => void;
	handleRedirectToView: (categoryId: number) => void;
	handleRedirectToEdit: (categoryId: number) => void;

	// Sorting
	handleSort: (field: CategoryAdminSortField) => void;
	renderSortIcon: (field: CategoryAdminSortField) => JSX.Element | null;

	// Pagination
	pagination: UsePaginationReturn;

	// Selection
	selection: ReturnType<typeof useTableSelection<number>>;
}

export function useCategoryAdminLogic(
	categories: CategoryListItemAdmin[],
): CategoryAdminLogicReturn {
	const router: AppRouterInstance = useRouter();

	// 1. Sorting
	const { handleSort, renderSortIcon } = useTableSort<CategoryAdminSortField>();

	// 2. Pagination
	const pagination = usePagination();

	// 3. Table Selection (Tính toán keys từ mảng categories hiện tại)
	const allKeys: number[] = categories.map((c) => c.id);
	const selection = useTableSelection<number>(allKeys);

	// 4. Routing Actions
	const handleRedirectToAddNew = (): void => router.push('/admin/categories/add-new');
	const handleRedirectToView = (categoryId: number): void =>
		router.push(`/admin/categories/${categoryId}`);
	const handleRedirectToEdit = (categoryId: number): void =>
		router.push(`/admin/categories/update/${categoryId}`);

	return {
		handleRedirectToAddNew,
		handleRedirectToView,
		handleRedirectToEdit,
		handleSort,
		renderSortIcon,
		pagination,
		selection,
	};
}
