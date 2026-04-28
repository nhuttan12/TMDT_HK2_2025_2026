import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import { FilterField } from '@/types/uis/FilterField';
import { useTableSelection, UseTableSelectionReturn } from '@/hooks/share/use-table-selection';
import { usePagination } from '@/hooks/share/use-pagination';
import { ShopProductPromotion } from '@/types/marketing/shop-promotions/ShopProductPromotion';
import { useStatusModal, UseStatusModalReturn } from '@/hooks/share/use-status-modal';
import { useState } from 'react';

interface ShopProductPromotionFilterValues {
	productName?: string;
	promotionPriceMin?: number;
	promotionPriceMax?: number;
	createdAtFrom?: string;
	createdAtTo?: string;
}

export interface UseShopProductPromotionLogicReturn extends UseTableSelectionReturn<number> {
	currentPage: number;
	changePage: (page: number) => void;
	filterSchema: FilterField<ShopProductPromotionFilterValues>[];
	handleAddNewProductVariant: (promotionId: number) => void;
	handleViewProductVariant: (productId: number, productVariantId: number) => void;

	modal: UseStatusModalReturn;
	handleTriggerToggleStatus: (promotion: ShopProductPromotion) => void;
	handleConfirmToggleStatus: () => void;
	handleCancelModal: () => void;
}

export function useShopProductPromotionLogic(
	promotions: ShopProductPromotion[],
): UseShopProductPromotionLogicReturn {
	const router: AppRouterInstance = useRouter();

	// 1. Logic Table Selection
	const allKeys: number[] = promotions.map((p) => p.id);
	const selection = useTableSelection<number>(allKeys);

	// 2. Logic Pagination
	const { currentPage, changePage } = usePagination();

	// 3. Định nghĩa Filter Schema hiển thị trong Modal
	const filterSchema: FilterField<ShopProductPromotionFilterValues>[] = [
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
	const [togglingPromotion, setTogglingPromotion] = useState<ShopProductPromotion | null>(null);

	// 4. Các Event Handlers
	const handleAddNewProductVariant = (promotionId: number): void => {
		router.push(`/admin/marketing/shop-promotions/${promotionId}/products/add-new`);
	};

	const handleViewProductVariant = (productId: number, productVariantId: number): void => {
		router.push(`/admin/products/${productId}/variant/${productVariantId}`);
	};

	const handleTriggerToggleStatus = (promotion: ShopProductPromotion): void => {
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
		handleAddNewProductVariant: handleAddNewProductVariant,
		handleViewProductVariant: handleViewProductVariant,

		modal: modal,
		handleTriggerToggleStatus: handleTriggerToggleStatus,
		handleConfirmToggleStatus: handleConfirmToggleStatus,
		handleCancelModal: handleCancelModal,
	};
}
