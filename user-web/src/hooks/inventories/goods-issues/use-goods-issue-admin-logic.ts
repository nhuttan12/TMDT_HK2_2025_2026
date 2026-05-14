import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useTableSort } from '@/hooks/share/use-table-sort';
import { usePagination, UsePaginationReturn } from '@/hooks/share/use-pagination';
import useConfirmDelete from '@/hooks/share/admin/use-confirm-delete';
import { GoodsIssueSortField } from '@/types/inventories/issues/uis/GoodsIssueSortField';
import { GoodsIssueList } from '@/types/inventories/issues/uis/GoodsIssueList';
import { JSX } from 'react';

export interface GoodsIssueAdminLogicReturn {
	// Routing Actions
	handleRedirectToAddNew: () => void;
	handleRedirectToView: (id: number) => void;
	handleRedirectToEdit: (id: number) => void;

	// Sorting
	handleSort: (field: GoodsIssueSortField) => void;
	renderSortIcon: (field: GoodsIssueSortField) => JSX.Element | null;

	// Pagination
	pagination: UsePaginationReturn;

	// Delete Action
	deleteModal: ReturnType<typeof useConfirmDelete<GoodsIssueList>>;
	handleExecuteDelete: () => void;
}

export function useGoodsIssueAdminLogic(): GoodsIssueAdminLogicReturn {
	const router: AppRouterInstance = useRouter();

	const { handleSort, renderSortIcon } = useTableSort<GoodsIssueSortField>();
	const pagination = usePagination();
	const deleteModal = useConfirmDelete<GoodsIssueList>();

	const handleRedirectToAddNew = (): void => router.push(`/shop-owner/inventories/issues/add-new`);
	const handleRedirectToView = (id: number): void =>
		router.push(`/shop-owner/inventories/issues/${id}`);
	const handleRedirectToEdit = (id: number): void =>
		router.push(`/shop-owner/inventories/issues/${id}/edit`);

	const handleExecuteDelete = (): void => {
		if (deleteModal.selectedItem) {
			console.log('Thực hiện gọi API xóa ID:', deleteModal.selectedItem.id);
			// TODO: Gọi Mutation Hook API xóa ở đây, sau đó invalidate query
			deleteModal.closeConfirm();
		}
	};

	return {
		handleRedirectToAddNew,
		handleRedirectToView,
		handleRedirectToEdit,
		handleSort,
		renderSortIcon,
		pagination,
		deleteModal,
		handleExecuteDelete,
	};
}
