'use client';

import { useCreateGoodsReceiptMutation } from '@/queries/inventories/goods-receipts/use-create-goods-receipt-mutation';
import { useBatchReceiptStore } from '@/stores/batch-receipt.store';
import { GoodsReceiptBatch } from '@/types/inventories/receipts/uis/GoodsReceiptBatch';
import { GoodsReceiptDetail } from '@/types/inventories/receipts/uis/GoodsReceiptDetail';
import { ProductForGoodsReceipt } from '@/types/inventories/receipts/uis/ProductForGoodsReceipt';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import { mapToGoodsReceiptRequest } from '@/utils/inventories/receipts/mappers/receipts';
import { useRouter } from 'next/navigation';
import { SyntheticEvent, useEffect, useState } from 'react';

export interface UseGoodsReceiptFormProps {
	formType: AdminFormType;
	goodsReceipt: GoodsReceiptDetail;
}

export function useGoodsReceiptForm({ formType, goodsReceipt }: UseGoodsReceiptFormProps) {
    const router = useRouter();
    
	const isView = formType === 'view';
	const isCreate = formType === 'create';

	const [form, setForm] = useState<GoodsReceiptDetail>(() => {
		if (isCreate) {
			return {
				...goodsReceipt,
				id: goodsReceipt.id || crypto.randomUUID(),
				importDate: goodsReceipt?.importDate || new Date().toISOString(),
				importStatus: goodsReceipt?.importStatus || 'pending',
				code: goodsReceipt?.code || '',
				note: goodsReceipt?.note || '',
			};
		}

		return goodsReceipt;
	});

	const receiptForm = useBatchReceiptStore((s) => s.receiptForm);
	const initReceiptForm = useBatchReceiptStore((s) => s.initReceiptForm);
	const updateReceiptFieldStore = useBatchReceiptStore((s) => s.updateReceiptFieldStore);
	const batches = useBatchReceiptStore((s) => s.batches);
	const addBatch = useBatchReceiptStore((s) => s.addBatch);
	const updateBatch = useBatchReceiptStore((s) => s.updateBatch);
	const generateId = useBatchReceiptStore((s) => s.generateId);
	const batchItemsByBatchId = useBatchReceiptStore((s) => s.batchItemsByBatchId);
	const reset = useBatchReceiptStore((s) => s.reset);
	const draftKey: string | null = useBatchReceiptStore((s): string | null => s.draftKey);
	const setDraftKey: (key: string) => void = useBatchReceiptStore((s) => s.setDraftKey);

	const formToRender: GoodsReceiptDetail = receiptForm || goodsReceipt;

	const createReceiptMutation = useCreateGoodsReceiptMutation();

	useEffect((): void => {
		const currentKey = isCreate ? 'create-new' : `receipt-${goodsReceipt.id}`;

		if (draftKey !== currentKey) {
			if (isCreate) {
				reset();

				initReceiptForm({
					...goodsReceipt,
					id: crypto.randomUUID(),
					importDate: new Date().toISOString(),
					importStatus: 'pending',
					code: '',
					note: '',
				});
			} else {
				initReceiptForm(goodsReceipt);
			}
			setDraftKey(currentKey);
		}
	}, [
		formType,
		goodsReceipt.id,
		draftKey,
		isCreate,
		reset,
		setDraftKey,
		goodsReceipt,
		initReceiptForm,
	]);

	// Helper function dùng từ khóa function
	function updateReceiptField<K extends keyof GoodsReceiptDetail>(
		key: K,
		value: GoodsReceiptDetail[K],
	): void {
		updateReceiptFieldStore(key, value);
	}

	// Handler dùng arrow function
	const handleSubmit = (e: SyntheticEvent): void => {
		e.preventDefault();

		if (createReceiptMutation.isPending) return;

		const latestStore = useBatchReceiptStore.getState();
		const latestForm = latestStore.receiptForm || formToRender;

        console.log('latestForm', latestForm);
        console.log('latestStore', latestStore);

		const payload = mapToGoodsReceiptRequest(latestForm, latestStore.batchItemsByBatchId);

        console.log('payload', payload);
        
        createReceiptMutation.mutate(payload, {
            onSuccess: (newId) => {
                console.log('Tạo thành công phiếu nhập, ID:', newId);
                router.push('/shop-owner/inventories/receipts');
            },
            onError: (error) => {
                console.error(error);
                alert('Tạo phiếu nhập kho thất bại. Vui lòng kiểm tra lại dữ liệu!');
            }
        });
	};

	const handleProductSelection = (product: ProductForGoodsReceipt): void => {
		const id: string = generateId();
		const newBatch: GoodsReceiptBatch = {
			id: id,
			productId: product.id,
			productName: product.name,
			batchCode: '',
			quantity: 1,
			totalPrice: 0,
		};
		addBatch(newBatch);
	};

	const totalQuantity = batches.reduce((sum, i) => sum + i.quantity, 0);
	const totalAmount = batches.reduce((sum, i) => sum + i.totalPrice, 0);

	return {
		form: formToRender,
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
