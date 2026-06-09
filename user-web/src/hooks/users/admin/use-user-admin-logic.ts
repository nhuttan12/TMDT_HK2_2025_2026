import { JSX } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';

import { useTableSort } from '@/hooks/share/use-table-sort';
import { usePagination } from '@/hooks/share/use-pagination';
import { UserAdminSortField } from '@/types/users/admin/UserAdminSort';

export interface UseUserAdminLogicReturn {
	currentPage: number;
	changePage: (page: number) => void;
	handleSort: (field: UserAdminSortField) => void;
	renderSortIcon: (field: UserAdminSortField) => JSX.Element | null;
	handleRedirectToCustomerInfoViewMode: (userId: string) => void;
	handleRedirectToEditCustomerEditMode: (userId: string) => void;
}

export function useUserAdminLogic(): UseUserAdminLogicReturn {
	const router: AppRouterInstance = useRouter();

	const { handleSort, renderSortIcon } = useTableSort<UserAdminSortField>();
	const { currentPage, changePage } = usePagination();

	const handleRedirectToCustomerInfoViewMode = (userId: string): void => {
		router.push(`/admin/users/customers/${userId}`);
	};

	const handleRedirectToEditCustomerEditMode = (userId: string): void => {
		router.push(`/admin/users/customers/update/${userId}`);
	};

	return {
		currentPage: currentPage,
		changePage: changePage,
		handleSort: handleSort,
		renderSortIcon: renderSortIcon as (field: UserAdminSortField) => JSX.Element | null,
		handleRedirectToCustomerInfoViewMode: handleRedirectToCustomerInfoViewMode,
		handleRedirectToEditCustomerEditMode: handleRedirectToEditCustomerEditMode,
	};
}
