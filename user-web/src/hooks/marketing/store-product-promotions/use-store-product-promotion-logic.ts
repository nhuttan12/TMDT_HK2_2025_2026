import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import { FilterField } from '@/types/uis/FilterField';
import { useTableSelection, UseTableSelectionReturn } from '@/hooks/share/use-table-selection';
import { usePagination } from '@/hooks/share/use-pagination';
import { StoreProductPromotion } from '@/types/marketing/store-product-promotions/StoreProductPromotion';
import { useStatusModal, UseStatusModalReturn } from '@/hooks/share/use-status-modal';
import { useState } from 'react';

interface StoreProductPromotionFilterValues {
	productName?: string;
	promotionPriceMin?: number;
	promotionPriceMax?: number;
	createdAtFrom?: string;
	createdAtTo?: string;
}

export interface UseStoreProductPromotionLogicReturn extends UseTableSelectionReturn<number> {
	currentPage: number;
	changePage: (page: number) => void;
	filterSchema: FilterField<StoreProductPromotionFilterValues>[];
	handleAddNewPromotion: () => void;
	handleEditPromotion: (id: number) => void;
	handleDeletePromotion: (id: number) => void;

	modal: UseStatusModalReturn;
	handleTriggerToggleStatus: (promotion: StoreProductPromotion) => void;
	handleConfirmToggleStatus: () => void;
	handleCancelModal: () => void;
}

export function useStoreProductPromotionLogic(
	promotions: StoreProductPromotion[],
): UseStoreProductPromotionLogicReturn {
	const router: AppRouterInstance = useRouter();

	// 1. Logic Table Selection
	const allKeys: number[] = promotions.map((p) => p.id);
	const selection = useTableSelection<number>(allKeys);

	// 2. Logic Pagination
	const { currentPage, changePage } = usePagination();

	// 3. Định nghĩa Filter Schema hiển thị trong Modal
	const filterSchema: FilterField<StoreProductPromotionFilterValues>[] = [
		{
			key: 'promotionPriceMin',
			label: 'Giá KM thấp nhất',
			type: 'number',
			gridSpan: 1,
			placeholder: '100000',
		},
		{
			key: 'promotionPriceMax',
			label: 'Giá KM cao nhất',
			type: 'number',
			gridSpan: 1,
			placeholder: '5000000',
		},
		{ key: 'createdAtFrom', label: 'Tạo từ ngày', type: 'date', gridSpan: 1 },
		{ key: 'createdAtTo', label: 'Đến ngày', type: 'date', gridSpan: 1 },
	];

	// 4. Khởi tạo Modal State
	const modal: UseStatusModalReturn = useStatusModal();
	const [togglingPromotion, setTogglingPromotion] = useState<StoreProductPromotion | null>(null);

	// 4. Các Event Handlers
	const handleAddNewPromotion = (): void => {
		router.push('/seller/promotions/add-new');
	};

	const handleEditPromotion = (id: number): void => {
		router.push(`/seller/promotions/update/${id}`);
	};

	const handleDeletePromotion = (id: number): void => {
		console.log('Xóa khuyến mãi ID:', id);
		// Tích hợp logic Modal Confirm xóa ở đây nếu cần
	};

	const handleTriggerToggleStatus = (promotion: StoreProductPromotion): void => {
		setTogglingPromotion(promotion);
		const actionText = promotion.status ? 'tắt' : 'bật';
		modal.showWarning(
			`Bạn có chắc chắn muốn ${actionText} khuyến mãi "${promotion.productName}" không?`,
		);
	};

	// Xử lý khi bấm "Xác nhận" trong Modal
	const handleConfirmToggleStatus = (): void => {
		if (togglingPromotion) {
			console.log(
				`Gọi API cập nhật trạng thái ID: ${togglingPromotion.id} thành ${!togglingPromotion.status}`,
			);
			// TODO: Gọi API cập nhật ở đây (ví dụ: await togglePromotionStatus(togglingPromotion.id))

			setTogglingPromotion(null);
			modal.closeModal();
		}
	};

	const handleCancelModal = (): void => {
		setTogglingPromotion(null);
		modal.closeModal();
	};

	return {
		...selection,
		currentPage: currentPage,
		changePage: changePage,
		filterSchema: filterSchema,
		handleAddNewPromotion: handleAddNewPromotion,
		handleEditPromotion: handleEditPromotion,
		handleDeletePromotion: handleDeletePromotion,

		modal: modal,
		handleTriggerToggleStatus: handleTriggerToggleStatus,
		handleConfirmToggleStatus: handleConfirmToggleStatus,
		handleCancelModal: handleCancelModal,
	};
}
