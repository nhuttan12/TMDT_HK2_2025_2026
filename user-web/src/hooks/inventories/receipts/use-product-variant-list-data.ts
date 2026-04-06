import { BatchReceiptStore, useBatchReceiptStore } from '@/stores/batch-receipt.store';
import { BatchItemSerial } from '@/types/inventories/receipts/uis/BatchItemSerial';
import { useMemo } from 'react';
import { ProductVariantRow } from '@/types/inventories/receipts/uis/ProductVariantRow';

interface Props {
	batchId?: number;
	initialProductVariants?: BatchItemSerial[];
}

const mockProductVariants: ProductVariantRow[] = [
	{ id: 1, name: 'iPhone 15 Pro Max - 256GB - Titan Tự Nhiên', sku: 'IP15PM-256-TTN' },
	{ id: 2, name: 'iPhone 15 Pro Max - 512GB - Titan Xanh', sku: 'IP15PM-512-TX' },
	{ id: 3, name: 'iPhone 15 Pro - 128GB - Titan Đen', sku: 'IP15P-128-TD' },
	{ id: 4, name: 'Samsung S24 Ultra - 256GB - Đen', sku: 'SS24U-256-BLK' },
	{ id: 5, name: 'Samsung S24 Ultra - 512GB - Tím', sku: 'SS24U-512-PUR' },
	{ id: 6, name: 'Xiaomi 14 Pro - 256GB - Trắng', sku: 'XM14P-256-WHT' },
	{ id: 7, name: 'Xiaomi 14 Pro - 512GB - Xanh', sku: 'XM14P-512-BLU' },
	{ id: 8, name: 'OPPO Find X7 - 256GB - Đen', sku: 'OPPOX7-256-BLK' },
	{ id: 9, name: 'Vivo X100 Pro - 512GB - Cam', sku: 'VIVOX100P-512-ORG' },
	{ id: 10, name: 'Realme GT5 - 256GB - Bạc', sku: 'REALMEGT5-256-SLV' },
];

export function useProductVariantListData(props?: Props) {
	const { batchId, initialProductVariants = [] } = props || {};

	const batchItems: BatchItemSerial[] = useBatchReceiptStore(
		(s: BatchReceiptStore): BatchItemSerial[] => {
			if (batchId === undefined) return [];
			return s.batchItemsByBatchId[batchId] ?? [];
		},
	);

	const generateId = useBatchReceiptStore((s: BatchReceiptStore): (() => number) => s.generateId);

	const filteredInitialItems: BatchItemSerial[] = useMemo((): BatchItemSerial[] => {
		return initialProductVariants.filter((item: BatchItemSerial): boolean => {
			return item.batchId === batchId;
		});
	}, [initialProductVariants, batchId]);

	const displayData: BatchItemSerial[] = useMemo(
		function (): BatchItemSerial[] {
			return batchItems.length > 0 ? batchItems : filteredInitialItems;
		},
		[batchItems, filteredInitialItems],
	);

	return {
		displayData,
		availableVariants: mockProductVariants,
		generateId,
	};
}
