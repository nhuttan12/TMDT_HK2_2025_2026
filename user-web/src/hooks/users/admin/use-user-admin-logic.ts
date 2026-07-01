import { useRouter } from 'next/navigation';
import { JSX } from 'react';

import { usePagination } from '@/hooks/share/use-pagination';
import { useTableSort } from '@/hooks/share/use-table-sort';
import { useUserAdminMuatation } from '@/queries/users/admin/use-user-admin-mutaion';
import { UserAdminSortField } from '@/types/users/admin/UserAdminSort';
import { UseStatusModalReturn } from '@/hooks/share/use-status-modal';

export interface UseUserAdminLogicReturn {
	currentPage: number;
    totalPages: number;
    modal: UseStatusModalReturn;
	changePage: (page: number) => void;
	handleSort: (field: UserAdminSortField) => void;
	renderSortIcon: (field: UserAdminSortField) => JSX.Element | null;
	handleRedirectToCustomerInfoViewMode: (userId: string) => void;
	handleRedirectToEditCustomerEditMode: (userId: string) => void;
    handleLockUser: (userId: string) => void
}

export function useUserAdminLogic(totalPages: number): UseUserAdminLogicReturn {
	const router = useRouter();

	const { handleSort, renderSortIcon } = useTableSort<UserAdminSortField>();
	const { currentPage, changePage } = usePagination();

    const {mutation, modal } = useUserAdminMuatation();

	const handleRedirectToCustomerInfoViewMode = (userId: string): void => {
		router.push(`/admin/users/customers/${userId}`);
	};

	const handleRedirectToEditCustomerEditMode = (userId: string): void => {
		router.push(`/admin/users/customers/update/${userId}`);
	};

    const handleLockUser = (userId: string): void => {
        mutation.mutate(userId);
    }

	return {
		currentPage,
        totalPages,
        modal,
		changePage,
		handleSort,
		renderSortIcon: renderSortIcon as (field: UserAdminSortField) => JSX.Element | null,
		handleRedirectToCustomerInfoViewMode,
		handleRedirectToEditCustomerEditMode,
        handleLockUser
	};
}
