'use client';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';

export interface UseGoodsReceiptNavigationLogicReturn {
	handleRedirectToBatchDetail: (receiptID: number, batchID: number, mode: AdminFormType) => void;
	handleRedirectToAddNewReceiptDetail: () => void;
	handleRedirectToEditReceiptDetail: (receiptID: number) => void;
	handleRedirectToReceiptDetail: (receiptID: number) => void;
}

export const useGoodsReceiptNavigationLogic = (): UseGoodsReceiptNavigationLogicReturn => {
	const router: AppRouterInstance = useRouter();

	const handleRedirectToBatchDetail = (
		receiptID: number,
		batchID: number,
		mode: AdminFormType,
	): void => {
		const path: string =
			mode === 'view'
				? `/shop-owner/inventories/receipts/${receiptID}/batches/${batchID}`
				: `/shop-owner/inventories/receipts/${receiptID}/batches/${batchID}/add-new`;
		router.push(path);
	};

	const handleRedirectToAddNewReceiptDetail = (): void => {
		router.push(`/shop-owner/inventories/receipts/add-new`);
	};

	const handleRedirectToEditReceiptDetail = (receiptID: number): void => {
		router.push(`/shop-owner/inventories/receipts/${receiptID}/edit`);
	};

	const handleRedirectToReceiptDetail = (receiptID: number): void => {
		router.push(`/shop-owner/inventories/receipts/${receiptID}`);
	};

	return {
		handleRedirectToBatchDetail,
		handleRedirectToAddNewReceiptDetail,
		handleRedirectToEditReceiptDetail,
		handleRedirectToReceiptDetail,
	};
};
