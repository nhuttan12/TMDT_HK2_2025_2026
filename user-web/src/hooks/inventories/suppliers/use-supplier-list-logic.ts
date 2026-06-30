import { useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Supplier } from '@/types/inventories/suppliers/Supplier';
import { usePagination } from '@/hooks/share/use-pagination';
import { SupplierSortField } from '@/types/inventories/suppliers/SupplierSortField';
import { useStatusModal, UseStatusModalReturn } from '@/hooks/share/use-status-modal';
import { useTableSort } from '@/hooks/share/use-table-sort';

export interface UseSupplierListLogicReturn {
	currentPage: number;
	changePage: (page: number) => void;
	handleSort: (field: SupplierSortField) => void;
	renderSortIcon: (field: SupplierSortField) => ReactNode;
	handleViewSupplier: (row: Supplier) => void;
	handleEditSupplier: (row: Supplier) => void;
	handleTriggerDelete: (row: Supplier) => void;
	handleConfirmDelete: () => void;
	handleCancelDelete: () => void;
    handleAddSupplier: () => void;
	modal: UseStatusModalReturn;
}

export function useSupplierListLogic(): UseSupplierListLogicReturn {
	const router: AppRouterInstance = useRouter();

	const { currentPage, changePage } = usePagination();
	const { handleSort, renderSortIcon } = useTableSort<SupplierSortField>();

	const modal: UseStatusModalReturn = useStatusModal();
	const [deletingId, setDeletingId] = useState<string | null>(null);

	const handleViewSupplier = (row: Supplier): void => {
		router.push(`/shop-owner/inventories/suppliers/${row.id}/products`);
	};

	const handleEditSupplier = (row: Supplier): void => {
		router.push(`/shop-owner/inventories/suppliers/${row.id}/edit`);
	};

	// Bật modal cảnh báo khi nhấn nút xoá
	const handleTriggerDelete = (row: Supplier): void => {
		setDeletingId(row.id);
		modal.showWarning(`Bạn có chắc chắn muốn xoá nhà cung cấp "${row.name}" không?`);
	};

	// Xác nhận xoá từ Modal
	const handleConfirmDelete = (): void => {
		if (deletingId !== null) {
			// TODO: Gọi API xoá tại đây (VD: deleteSupplierMutation)
			console.log('Đã gọi lệnh xoá cho ID:', deletingId);

			setDeletingId(null);
			modal.closeModal();
		}
	};

	// Huỷ xoá từ Modal
	const handleCancelDelete = (): void => {
		setDeletingId(null);
		modal.closeModal();
	};

    const handleAddSupplier = (): void => {
        router.push('/shop-owner/inventories/suppliers/add-new');
    };

	return {
		currentPage,
		changePage,
		handleSort,
		renderSortIcon,
		handleViewSupplier,
		handleEditSupplier,
		handleTriggerDelete,
		handleConfirmDelete,
		handleCancelDelete,
        handleAddSupplier,
		modal: modal,
	};
}