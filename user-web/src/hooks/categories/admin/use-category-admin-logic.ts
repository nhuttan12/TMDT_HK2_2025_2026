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
	handleRedirectToView: (id: string) => void;
	handleRedirectToEdit: (id: string) => void;

	// Sorting
	handleSort: (field: CategoryAdminSortField) => void;
	renderSortIcon: (field: CategoryAdminSortField) => JSX.Element | null;

	// Pagination
	pagination: UsePaginationReturn;

	// Selection
	selection: ReturnType<typeof useTableSelection<string>>;
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
	const allKeys: string[] = categories.map((c) => c.id);
	const selection = useTableSelection<string>(allKeys);

	// 4. Routing Actions
	const handleRedirectToAddNew = (): void => router.push('/admin/categories/add-new');
	const handleRedirectToView = (id: string): void =>
		router.push(`/admin/categories/${id}`);
	const handleRedirectToEdit = (id: string): void =>
		router.push(`/admin/categories/update/${id}`);

	return {
		handleRedirectToAddNew: handleRedirectToAddNew,
		handleRedirectToView: handleRedirectToView,
		handleRedirectToEdit: handleRedirectToEdit,
		handleSort: handleSort,
		renderSortIcon: renderSortIcon,
		pagination: pagination,
		selection: selection,
	};
}
