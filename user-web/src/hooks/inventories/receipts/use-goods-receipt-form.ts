import { BatchReceiptStore, useBatchReceiptStore } from '@/stores/batch-receipt.store';
import { GoodsReceiptBatch } from '@/types/inventories/receipts/uis/GoodsReceiptBatch';
import { GoodsReceiptDetail } from '@/types/inventories/receipts/uis/GoodsReceiptDetail';
import { ProductForGoodsReceipt } from '@/types/inventories/receipts/uis/ProductForGoodsReceipt';
import { FormEvent, useEffect, useState } from 'react';
import { BatchItemSerial } from '@/types/inventories/receipts/uis/BatchItemSerial';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';

export interface UseGoodsReceiptFormProps {
	formType: AdminFormType;
	goodsReceipt: GoodsReceiptDetail;
}

export function useGoodsReceiptForm({ formType, goodsReceipt }: UseGoodsReceiptFormProps) {
	const isView: boolean = formType === 'view';
	const isCreate: boolean = formType === 'create';

	const [form, setForm] = useState<GoodsReceiptDetail>(goodsReceipt);

	// Trích xuất Store (Đã gom nhóm lại cho gọn)
	const batches: GoodsReceiptBatch[] = useBatchReceiptStore((s: BatchReceiptStore) => s.batches);
	const addBatch: (batch: GoodsReceiptBatch) => void = useBatchReceiptStore(
		(s: BatchReceiptStore) => s.addBatch,
	);
	const updateBatch: (id: number, data: Partial<GoodsReceiptBatch>) => void =
		useBatchReceiptStore((s: BatchReceiptStore) => s.updateBatch);
	const generateId: () => number = useBatchReceiptStore((s: BatchReceiptStore) => s.generateId);
	const batchItemsByBatchId: Record<number, BatchItemSerial[]> = useBatchReceiptStore(
		(s: BatchReceiptStore) => s.batchItemsByBatchId,
	);
	const reset: () => void = useBatchReceiptStore((s: BatchReceiptStore) => s.reset);
	const setBatches: (batches: GoodsReceiptBatch[]) => void = useBatchReceiptStore(
		(s: BatchReceiptStore) => s.setBatches,
	);
	const draftKey: string | null = useBatchReceiptStore(
		(s: BatchReceiptStore): string | null => s.draftKey,
	);
	const setDraftKey: (key: string) => void = useBatchReceiptStore(
		(s: BatchReceiptStore) => s.setDraftKey,
	);

	useEffect((): void => {
		const currentKey: string = isCreate ? 'create-new' : `receipt-${goodsReceipt.id}`;

		if (draftKey !== currentKey) {
			if (isCreate) {
				reset();
			} else {
				setBatches(goodsReceipt.batches ?? []);
			}
			setDraftKey(currentKey);
		}
	}, [formType, goodsReceipt.id, draftKey, isCreate, reset, setBatches, setDraftKey]);

	// Helper function dùng từ khóa function
	function updateReceiptField<K extends keyof GoodsReceiptDetail>(
		key: K,
		value: GoodsReceiptDetail[K],
	): void {
		setForm((prev: GoodsReceiptDetail): GoodsReceiptDetail => ({ ...prev, [key]: value }));
	}

	// Handler dùng arrow function
	const handleSubmit = (e: FormEvent): void => {
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
		const id: number = generateId();
		const newBatch: GoodsReceiptBatch = {
			id: id,
			isNew: true,
			productId: product.id,
			productName: product.name,
			batchNumber: '',
			quantity: 1,
			unitPrice: 0,
			totalPrice: 0,
			isSerialInputted: false,
		};
		addBatch(newBatch);
	};

	const totalQuantity: number = batches.reduce(
		(sum: number, i: GoodsReceiptBatch): number => sum + i.quantity,
		0,
	);
	const totalAmount: number = batches.reduce(
		(sum: number, i: GoodsReceiptBatch): number => sum + i.totalPrice,
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
