'use client';

import { BatchReceiptStore, useBatchReceiptStore } from '@/stores/batch-receipt.store';
import { BatchItem } from '@/types/inventories/receipts/uis/BatchItem';
import { GoodsReceiptBatch } from '@/types/inventories/receipts/uis/GoodsReceiptBatch';
import { GoodsReceiptDetail } from '@/types/inventories/receipts/uis/GoodsReceiptDetail';
import { ProductForGoodsReceipt } from '@/types/inventories/receipts/uis/ProductForGoodsReceipt';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import { SyntheticEvent, useEffect, useState } from 'react';

export interface UseGoodsReceiptFormProps {
	formType: AdminFormType;
	goodsReceipt: GoodsReceiptDetail;
}

export function useGoodsReceiptForm({ formType, goodsReceipt }: UseGoodsReceiptFormProps) {
	const isView = formType === 'view';
	const isCreate = formType === 'create';

	const [form, setForm] = useState<GoodsReceiptDetail>(goodsReceipt);

	// Trích xuất Store (Đã gom nhóm lại cho gọn)
	const batches = useBatchReceiptStore((s) => s.batches);
	const addBatch = useBatchReceiptStore((s) => s.addBatch);
	const updateBatch = useBatchReceiptStore((s) => s.updateBatch);
	const generateId = useBatchReceiptStore((s) => s.generateId);
	const batchItemsByBatchId = useBatchReceiptStore(
		(s) => s.batchItemsByBatchId,
	);
	const reset = useBatchReceiptStore((s) => s.reset);
	const setBatches = useBatchReceiptStore(
		(s) => s.setBatches,
	);
	const draftKey: string | null = useBatchReceiptStore((s): string | null => s.draftKey);
	const setDraftKey: (key: string) => void = useBatchReceiptStore((s) => s.setDraftKey);

	useEffect((): void => {
		const currentKey = isCreate ? 'create-new' : `receipt-${goodsReceipt.id}`;

		if (draftKey !== currentKey) {
			if (isCreate) {
				reset();
			} else {
				setBatches(goodsReceipt.batches ?? []);
			}
			setDraftKey(currentKey);
		}
	}, [
		formType,
		goodsReceipt.id,
		draftKey,
		isCreate,
		reset,
		setBatches,
		setDraftKey,
		goodsReceipt.batches,
	]);

	// Helper function dùng từ khóa function
	function updateReceiptField<K extends keyof GoodsReceiptDetail>(
		key: K,
		value: GoodsReceiptDetail[K],
	): void {
		setForm((prev: GoodsReceiptDetail): GoodsReceiptDetail => ({ ...prev, [key]: value }));
	}

	// Handler dùng arrow function
	const handleSubmit = (e: SyntheticEvent): void => {
		e.preventDefault();

		const payload: GoodsReceiptDetail = {
			...form,
			batches: batches.map((batch: GoodsReceiptBatch) => ({
				...batch,
				items: batchItemsByBatchId[batch.id] || [],
			})),
		};

		console.log('Submit:', payload);
	};

	const handleProductSelection = (product: ProductForGoodsReceipt): void => {
		const id: string = generateId();
		const newBatch: GoodsReceiptBatch = {
			id: id,
			productId: product.id,
			productName: product.name,
			batchNumber: '',
			quantity: 1,
			totalPrice: 0,
		};
		addBatch(newBatch);
	};

	const totalQuantity = batches.reduce(
		(sum, i) => sum + i.quantity,
		0,
	);
	const totalAmount = batches.reduce(
		(sum, i) => sum + i.totalPrice,
		0,
	);

	return {
		form,
		batches,
		isView,
		isCreate,
		totalQuantity,
		totalAmount,
		updateReceiptField,
		handleSubmit,
		handleProductSelection,
		updateBatch,
	};
}
