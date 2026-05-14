'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import { BatchReceiptStore, useBatchReceiptStore } from '@/stores/batch-receipt.store';
import { BatchItemSerial } from '@/types/inventories/receipts/uis/BatchItemSerial';
import { ProductVariantRow } from '@/types/inventories/receipts/uis/ProductVariantRow';
import { usePagination, UsePaginationReturn } from '@/hooks/share/use-pagination';

// 1. Khai báo Interface đầu vào
export interface UseProductVariantListLogicProps {
	batchId: number;
	initialProductVariants?: BatchItemSerial[];
}

// 2. Khai báo Interface trả về để Container và UI sử dụng
export interface UseProductVariantListLogicReturn extends UsePaginationReturn {
	displayData: BatchItemSerial[];
	isModalOpen: boolean;
	setIsModalOpen: (open: boolean) => void;
	handleSelectVariants: (variants: ProductVariantRow[]) => void;
	handleUpdateItem: (itemId: number, fields: Partial<BatchItemSerial>) => void;
	handleRemoveItem: (itemId: number) => void;
	handleRedirectToDetail: (row: BatchItemSerial) => void;
	handleRedirectToCreateBatchReceipt: () => void;
}

export const useProductVariantListLogic = ({
	batchId,
	initialProductVariants = [],
}: UseProductVariantListLogicProps): UseProductVariantListLogicReturn => {
	const router: AppRouterInstance = useRouter();

	// --- Local UI States ---
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const { currentPage, changePage } = usePagination();

	// --- Zustand Store ---
	const batchItems: BatchItemSerial[] = useBatchReceiptStore(
		(s: BatchReceiptStore): BatchItemSerial[] => {
			if (batchId === undefined) return [];
			return s.batchItemsByBatchId[batchId] ?? [];
		},
	);

	const generateId = useBatchReceiptStore((s: BatchReceiptStore): (() => number) => s.generateId);
	const addBatchItems = useBatchReceiptStore(
		(s: BatchReceiptStore): ((batchId: number, items: BatchItemSerial[]) => void) =>
			s.addBatchItems,
	);
	const removeBatchItem = useBatchReceiptStore(
		(s: BatchReceiptStore): ((batchId: number, itemId: number) => void) => s.removeBatchItem,
	);
	const updateBatchItem = useBatchReceiptStore(
		(
			s: BatchReceiptStore,
		): ((batchId: number, itemId: number, fields: Partial<BatchItemSerial>) => void) =>
			s.updateBatchItem,
	);

	// --- Logic Xử lý Dữ liệu hiển thị (Display Data) ---
	const filteredInitialItems: BatchItemSerial[] = useMemo((): BatchItemSerial[] => {
		return initialProductVariants.filter((item: BatchItemSerial): boolean => {
			return item.batchId === batchId;
		});
	}, [initialProductVariants, batchId]);

	const displayData: BatchItemSerial[] = useMemo((): BatchItemSerial[] => {
		return batchItems.length > 0 ? batchItems : filteredInitialItems;
	}, [batchItems, filteredInitialItems]);

	// --- Logic Xử lý Sự kiện (Actions) ---
	const handleSelectVariants = (variants: ProductVariantRow[]): void => {
		const newItems: BatchItemSerial[] = variants.map(
			(v: ProductVariantRow): BatchItemSerial => {
				return {
					id: generateId(),
					productId: 0, // Lưu ý: Chỗ này productId có thể cần map nếu variant có chứa productId
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
		setIsModalOpen(false);
	};

	const handleUpdateItem = (itemId: number, fields: Partial<BatchItemSerial>): void => {
		updateBatchItem(batchId, itemId, fields);
	};

	const handleRemoveItem = (itemId: number): void => {
		removeBatchItem(batchId, itemId);
	};

	const handleRedirectToDetail = (row: BatchItemSerial): void => {
		router.push(`/shop-owner/products/${row.productId}/variant/${row.productVariantId}`);
	};

	const handleRedirectToCreateBatchReceipt = (): void => {
		router.push('/shop-owner/inventories/receipts/add-new');
	};

	return {
		// Trả về UI State
		isModalOpen,
		setIsModalOpen,
		currentPage,
		changePage,
		// Trả về Data & Actions
		displayData,
		handleSelectVariants,
		handleUpdateItem,
		handleRemoveItem,
		handleRedirectToDetail,
		handleRedirectToCreateBatchReceipt,
	};
};
