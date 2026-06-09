'use client';

import { useTableSelection, UseTableSelectionReturn } from '@/hooks/share/use-table-selection';
import { useStatusModal, UseStatusModalReturn } from '@/hooks/share/use-status-modal';
import { ShopPromotion } from '@/types/marketing/shop-promotions/ShopPromotion';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AppRole } from '@/types/uis/AppRole';

export interface UseShopPromotionLogicReturn extends UseTableSelectionReturn<string> {
	modal: UseStatusModalReturn;
	handleViewPromotion: (id: string) => void;
	handleAddPromotion: () => void;
	handleEditPromotion: (id: string) => void;
	handleDeletePromotion: (id: string) => void;
	handleTriggerToggleStatus: (promotion: ShopPromotion) => void;
	handleConfirmAction: () => void;
	handleCancelModal: () => void;
}

interface UseShopPromotionLogicProps {
	promotions: ShopPromotion[];
	role: AppRole;
}

export function useShopPromotionLogic({
	promotions,
	role,
}: UseShopPromotionLogicProps): UseShopPromotionLogicReturn {
	const router: AppRouterInstance = useRouter();

	// 1. Logic Selection
	// Lưu ý: Key của object này là promotionId
	const allKeys: string[] = promotions.map((p: ShopPromotion): string => p.id);
	const selection: UseTableSelectionReturn<string> = useTableSelection<string>(allKeys);

	// 2. Logic Modal & Trạng thái
	const modal: UseStatusModalReturn = useStatusModal();
	const [activeAction, setActiveAction] = useState<{
		type: 'toggle' | 'delete';
		payload: ShopPromotion | string;
	} | null>(null);

	const route = role == 'admin' ? 'admin' : role == 'shop-owner' ? 'shop-owner' : '';

	const handleAddPromotion = (): void => {
		router.push(`/${route}/marketing/promotions/add-new`);
	};

	const handleViewPromotion = (id: string): void => {
		// Thêm ID vào URL để biết đang xem sản phẩm của Promotion nào
		router.push(`/${route}/marketing/promotions/${id}`);
	};

	const handleEditPromotion = (id: string): void => {
		router.push(`/${route}/marketing/promotions/${id}/update`);
	};

	const handleDeletePromotion = (id: string): void => {
		setActiveAction({ type: 'delete', payload: id });
		modal.showWarning('Bạn có chắc chắn muốn xóa mã khuyến mãi này không?');
	};

	const handleTriggerToggleStatus = (promotion: ShopPromotion): void => {
		setActiveAction({ type: 'toggle', payload: promotion });
		const actionText = promotion.status ? 'tắt' : 'bật';
		modal.showWarning(`Bạn có chắc chắn muốn ${actionText} mã "${promotion.name}" không?`);
	};

	const handleConfirmAction = (): void => {
		if (activeAction?.type === 'toggle') {
			const target = activeAction.payload as ShopPromotion;
			console.log(`Call API toggle status cho ID: ${target.id}`);
		} else if (activeAction?.type === 'delete') {
			const id = activeAction.payload;
			console.log(`Call API delete cho ID: ${id}`);
		}

		setActiveAction(null);
		modal.closeModal();
	};

	const handleCancelModal = (): void => {
		setActiveAction(null);
		modal.closeModal();
	};

	return {
		...selection,
		modal: modal,
		handleAddPromotion: handleAddPromotion,
		handleViewPromotion: handleViewPromotion,
		handleEditPromotion: handleEditPromotion,
		handleDeletePromotion: handleDeletePromotion,
		handleTriggerToggleStatus: handleTriggerToggleStatus,
		handleConfirmAction: handleConfirmAction,
		handleCancelModal: handleCancelModal,
	};
}
