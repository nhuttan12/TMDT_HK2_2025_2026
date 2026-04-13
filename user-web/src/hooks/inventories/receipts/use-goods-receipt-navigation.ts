'use client';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';

export function useGoodsReceiptNavigation() {
	const router: AppRouterInstance = useRouter();

	const handleRedirectToBatchDetail = (
		receiptID: number,
		batchID: number,
		mode: AdminFormType,
	): void => {
		const path: string =
			mode === 'view'
				? `/admin/inventories/receipts/${receiptID}/batches/${batchID}`
				: `/admin/inventories/receipts/${receiptID}/batches/${batchID}/add-new`;
		router.push(path);
	};

	const handleRedirectToAddNewReceiptDetail = (): void => {
		router.push(`/admin/inventories/receipts/add-new`);
	};

	const handleRedirectToEditReceiptDetail = (receiptID: number): void => {
		router.push(`/admin/inventories/receipts/${receiptID}/edit`);
	};

	const handleRedirectToReceiptDetail = (receiptID: number): void => {
		router.push(`/admin/inventories/receipts/${receiptID}`);
	};

	return {
		handleRedirectToBatchDetail,
		handleRedirectToAddNewReceiptDetail,
		handleRedirectToEditReceiptDetail,
		handleRedirectToReceiptDetail,
	};
}
