'use client';

import { GoodsReceiptDetail } from '@/types/inventories/receipts/uis/GoodsReceiptDetail';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import { useGoodsReceiptForm } from './use-goods-receipt-form';
import { useGoodsReceiptExcelLogic } from '@/hooks/inventories/goods-receipts/use-goods-receipt-excel-logic';
import { useGoodsReceiptNavigationLogic } from '@/hooks/inventories/goods-receipts/use-goods-receipt-navigation-logic';
import { GoodsReceiptBatch } from '@/types/inventories/receipts/uis/GoodsReceiptBatch';
import { ProductForGoodsReceipt } from '@/types/inventories/receipts/uis/ProductForGoodsReceipt';
import { SyntheticEvent } from 'react';

export interface UseGoodsReceiptDetailLogicProps {
	formType: AdminFormType;
	goodsReceipt: GoodsReceiptDetail;
}

// 1. Định nghĩa Interface trả về để UI Component kế thừa
export interface UseGoodsReceiptDetailLogicReturn {
	form: GoodsReceiptDetail;
	batches: GoodsReceiptBatch[];
	isView: boolean;
	isCreate: boolean;
	totalQuantity: number;
	totalAmount: number;
	updateReceiptField: (field: keyof GoodsReceiptDetail, value: string) => void;
	handleSubmit: (e: SyntheticEvent) => void;
	handleProductSelection: (product: ProductForGoodsReceipt) => void;
	updateBatch: (batchId: string, data: Partial<GoodsReceiptBatch>) => void;
	handleRedirectToBatchDetail: (batchId: string, productId: string, mode: AdminFormType) => void;
	handleStartExcelFlow: () => void;
	handleRedirectToAddNewReceiptDetail: () => void;
	handleRedirectToEditReceiptDetail: (receiptId: string) => void;
	handleRedirectToReceiptDetail: (receiptId: string) => void;
}

export const useGoodsReceiptDetailLogic = ({
	formType,
	goodsReceipt,
}: UseGoodsReceiptDetailLogicProps): UseGoodsReceiptDetailLogicReturn => {
	const formLogic = useGoodsReceiptForm({ formType, goodsReceipt });
	const excelLogic = useGoodsReceiptExcelLogic();
	const navigationLogic = useGoodsReceiptNavigationLogic();

	const handleRedirectToBatchDetailWithFormId = (batchId: string, productId: string, mode: AdminFormType): void => {
        console.log('handleRedirectToBatchDetailWithFormId', batchId, mode);

        navigationLogic.handleRedirectToBatchDetail(formLogic.form.id, batchId, productId, mode);
	};

	return {
		form: formLogic.form,
		batches: formLogic.batches,
		isView: formLogic.isView,
		isCreate: formLogic.isCreate,
		totalQuantity: formLogic.totalQuantity,
		totalAmount: formLogic.totalAmount,

		updateReceiptField: formLogic.updateReceiptField,
		handleSubmit: formLogic.handleSubmit,
		handleProductSelection: formLogic.handleProductSelection,
		updateBatch: formLogic.updateBatch,

		handleRedirectToBatchDetail: handleRedirectToBatchDetailWithFormId,

		handleStartExcelFlow: excelLogic.handleStartExcelFlow,
		handleRedirectToAddNewReceiptDetail: navigationLogic.handleRedirectToAddNewReceiptDetail,
		handleRedirectToEditReceiptDetail: navigationLogic.handleRedirectToEditReceiptDetail,
		handleRedirectToReceiptDetail: navigationLogic.handleRedirectToReceiptDetail,
	};
};
