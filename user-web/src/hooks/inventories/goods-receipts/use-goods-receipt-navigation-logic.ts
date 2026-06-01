'use client';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';

export interface UseGoodsReceiptNavigationLogicReturn {
	handleRedirectToBatchDetail: (receiptId: string, batchId: string, mode: AdminFormType) => void;
	handleRedirectToAddNewReceiptDetail: () => void;
	handleRedirectToEditReceiptDetail: (receiptId: string) => void;
	handleRedirectToReceiptDetail: (receiptId: string) => void;
}

export const useGoodsReceiptNavigationLogic = (): UseGoodsReceiptNavigationLogicReturn => {
	const router: AppRouterInstance = useRouter();

	const handleRedirectToBatchDetail = (
		receiptId: string,
		batchId: string,
		mode: AdminFormType,
	): void => {
		const path: string =
			mode === 'view'
				? `/shop-owner/inventories/receipts/${receiptId}/batches/${batchId}`
				: `/shop-owner/inventories/receipts/${receiptId}/batches/${batchId}/add-new`;
		router.push(path);
	};

	const handleRedirectToAddNewReceiptDetail = (): void => {
		router.push(`/shop-owner/inventories/receipts/add-new`);
	};

	const handleRedirectToEditReceiptDetail = (receiptId: string): void => {
		router.push(`/shop-owner/inventories/receipts/${receiptId}/edit`);
	};

	const handleRedirectToReceiptDetail = (receiptId: string): void => {
		router.push(`/shop-owner/inventories/receipts/${receiptId}`);
	};

	return {
		handleRedirectToBatchDetail,
		handleRedirectToAddNewReceiptDetail,
		handleRedirectToEditReceiptDetail,
		handleRedirectToReceiptDetail,
	};
};
