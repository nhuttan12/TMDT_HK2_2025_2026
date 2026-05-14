import { useState } from 'react';
import { ProductListInfoAdmin } from '@/types/products/admin/ProductListInfoAdmin';
import { useTableSelection, UseTableSelectionReturn } from '@/hooks/share/use-table-selection';
import { useStatusModal, UseStatusModalReturn } from '@/hooks/share/use-status-modal';

export interface UseProductAdminTableLogicProps {
	products: ProductListInfoAdmin[];
}

export interface UseProductAdminTableLogicReturn extends UseTableSelectionReturn<number> {
	modal: UseStatusModalReturn;
	handleTriggerDelete: (product: ProductListInfoAdmin) => void;
	handleConfirmDelete: () => void;
	handleCancelDelete: () => void;
}

export function useProductAdminTableLogic(
	props: UseProductAdminTableLogicProps,
): UseProductAdminTableLogicReturn {
	// Logic: Lấy toàn bộ ID làm keys cho table selection
	const allKeys: number[] = props.products.map((p: ProductListInfoAdmin): number => p.id);
	const selection = useTableSelection<number>(allKeys);

	// Logic: Quản lý modal xoá sản phẩm
	const modal: UseStatusModalReturn = useStatusModal();
	const [deletingId, setDeletingId] = useState<number | null>(null);

	const handleTriggerDelete = (product: ProductListInfoAdmin): void => {
		setDeletingId(product.id);
		modal.showWarning(`Bạn có chắc chắn muốn xoá sản phẩm "${product.name}" không?`);
	};

	const handleConfirmDelete = (): void => {
		if (deletingId !== null) {
			console.log('Gọi API xoá sản phẩm với ID:', deletingId);
			// TODO: await deleteProductMutation(deletingId)
			setDeletingId(null);
			modal.closeModal();
		}
	};

	const handleCancelDelete = (): void => {
		setDeletingId(null);
		modal.closeModal();
	};

	return {
		...selection,
		modal: modal,
		handleTriggerDelete: handleTriggerDelete,
		handleConfirmDelete: handleConfirmDelete,
		handleCancelDelete: handleCancelDelete,
	};
}
