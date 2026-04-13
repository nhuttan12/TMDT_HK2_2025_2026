'use client';

import { GoodsReceiptDetail } from '@/types/inventories/receipts/uis/GoodsReceiptDetail';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import { useGoodsReceiptForm } from './use-goods-receipt-form';
import { useGoodsReceiptExcel } from './use-goods-receipt-excel';
import { useGoodsReceiptNavigation } from './use-goods-receipt-navigation';

interface UseGoodsReceiptLogicProps {
	formType: AdminFormType;
	goodsReceipt: GoodsReceiptDetail;
}

export function useGoodsReceiptAdminLogic({ formType, goodsReceipt }: UseGoodsReceiptLogicProps) {
	// 1. Khởi tạo các sub-hooks
	const formLogic = useGoodsReceiptForm({ formType, goodsReceipt });
	const excelLogic = useGoodsReceiptExcel();
	const navigationLogic = useGoodsReceiptNavigation();

	// 2. Wrap logic: Tự động truyền form.id vào hàm redirect của navigation
	const handleRedirectToBatchDetailWithFormId = (batchID: number, mode: AdminFormType): void => {
		navigationLogic.handleRedirectToBatchDetail(formLogic.form.id, batchID, mode);
	};

	// 3. Trả về tường minh (Explicit Mapping) thay vì dùng spread operator (...)
	return {
		// --- State & Dữ liệu (Từ Form Hook) ---
		form: formLogic.form,
		batches: formLogic.batches,
		isView: formLogic.isView,
		isCreate: formLogic.isCreate,
		totalQuantity: formLogic.totalQuantity,
		totalAmount: formLogic.totalAmount,

		// --- Actions (Từ Form Hook) ---
		updateReceiptField: formLogic.updateReceiptField,
		handleSubmit: formLogic.handleSubmit,
		handleProductSelection: formLogic.handleProductSelection,
		updateBatch: formLogic.updateBatch,

		// --- Override Action (Wrap Navigation Hook) ---
		handleRedirectToBatchDetail: handleRedirectToBatchDetailWithFormId,

		// --- Actions (Từ Navigation & Excel Hook - Export ra cho View dùng) ---
		handleStartExcelFlow: excelLogic.handleStartExcelFlow,
		handleRedirectToAddNewReceiptDetail: navigationLogic.handleRedirectToAddNewReceiptDetail,
		handleRedirectToEditReceiptDetail: navigationLogic.handleRedirectToEditReceiptDetail,
		handleRedirectToReceiptDetail: navigationLogic.handleRedirectToReceiptDetail,
	};
}
