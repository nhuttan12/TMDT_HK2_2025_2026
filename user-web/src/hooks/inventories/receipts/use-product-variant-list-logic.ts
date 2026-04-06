import { BatchReceiptStore, useBatchReceiptStore } from '@/stores/batch-receipt.store';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ProductVariantRow } from '@/types/inventories/receipts/uis/ProductVariantRow';
import { BatchItemSerial } from '@/types/inventories/receipts/uis/BatchItemSerial';

interface UseProductVariantListActionsProps {
	batchId: number;
	router: AppRouterInstance;
	generateId: () => number;
	onCloseModal: () => void;
}

export function useProductVariantListLogic(props: UseProductVariantListActionsProps) {
	const { batchId, router, generateId, onCloseModal }: UseProductVariantListActionsProps = props;

	const addBatchItems = useBatchReceiptStore((s: BatchReceiptStore) => s.addBatchItems);
	const removeBatchItem = useBatchReceiptStore((s: BatchReceiptStore) => s.removeBatchItem);
	const updateBatchItem = useBatchReceiptStore((s: BatchReceiptStore) => s.updateBatchItem);


	const handleSelectVariants = (variants: ProductVariantRow[]): void => {
		const newItems: BatchItemSerial[] = variants.map(
			(v: ProductVariantRow): BatchItemSerial => {
				return {
					id: generateId(),
					productId: 0,
					batchId: batchId,
					productVariantId: v.id,
					productVariantName: v.name,
					serialNumber: '',
					appearanceCondition: '',
					status: 'in_stock',
					importDate: new Date().toISOString(),
				};
			},
		);

		addBatchItems(batchId, newItems);
		onCloseModal();
	};

	const handleUpdateItem = (itemId: number, fields: Partial<BatchItemSerial>): void => {
		updateBatchItem(batchId, itemId, fields);
	};

	const handleRemoveItem = (itemId: number): void => {
		removeBatchItem(batchId, itemId);
	};

	const handleRedirectToDetail = (row: BatchItemSerial): void => {
		router.push(`/admin/products/${row.productId}/variant/${row.productVariantId}`);
	};

	const handleRedirectToCreateBatchReceipt = (): void => {
		router.push('/admin/inventories/receipts/add-new');
	};


	return {
		handleSelectVariants,
		handleUpdateItem,
		handleRemoveItem,
		handleRedirectToDetail,
		handleRedirectToCreateBatchReceipt
	};
}
