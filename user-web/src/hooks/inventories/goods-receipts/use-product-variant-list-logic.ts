'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { usePagination, UsePaginationReturn } from '@/hooks/share/use-pagination';
import { useBatchReceiptStore } from '@/stores/batch-receipt.store';
import { BatchItem } from '@/types/inventories/receipts/uis/BatchItem';
import { ProductVariantRow } from '@/types/inventories/receipts/uis/ProductVariantRow';

// 1. Khai báo Interface đầu vào
export interface UseProductVariantListLogicProps {
	batchId: string;
	initialProductVariants?: BatchItem[];
	totalPagesFromApi?: number;
}

// 2. Khai báo Interface trả về để Container và UI sử dụng
export interface UseProductVariantListLogicReturn extends UsePaginationReturn {
	displayData: BatchItem[];
	isModalOpen: boolean;
	totalQuantity: number;
	totalAmount: number;
	totalPages: number;
	setIsModalOpen: (open: boolean) => void;
	handleSelectVariants: (variants: ProductVariantRow[]) => void;
	handleUpdateItem: (itemId: string, fields: Partial<BatchItem>) => void;
	handleRemoveItem: (itemId: string) => void;
	handleRedirectToDetail: (row: BatchItem) => void;
	handleRedirectToCreateBatchReceipt: () => void;
}

export const useProductVariantListLogic = ({
	batchId,
	initialProductVariants = [],
	totalPagesFromApi = 1,
}: UseProductVariantListLogicProps): UseProductVariantListLogicReturn => {
	const router = useRouter();

	// --- Local UI States ---
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const { currentPage, changePage } = usePagination();

	// --- Zustand Store ---
	const batchItems: BatchItem[] = useBatchReceiptStore((s): BatchItem[] => {
		if (batchId === undefined) return [];
		return s.batchItemsByBatchId[batchId] ?? [];
	});

	const generateId = useBatchReceiptStore((s): (() => string) => s.generateId);
    const batches = useBatchReceiptStore((s) => s.batches);
	const addBatchItems = useBatchReceiptStore(
		(s): ((batchId: string, items: BatchItem[]) => void) => s.addBatchItems,
	);
	const removeBatchItem = useBatchReceiptStore(
		(s): ((batchId: string, itemId: string) => void) => s.removeBatchItem,
	);
	const updateBatchItem = useBatchReceiptStore(
		(s): ((batchId: string, itemId: string, fields: Partial<BatchItem>) => void) =>
			s.updateBatchItem,
	);
	const getBatchItems = useBatchReceiptStore((s) => s.getBatchItems);
	const updateBatch = useBatchReceiptStore((s) => s.updateBatch);

	// --- Logic Xử lý Dữ liệu hiển thị (Display Data) ---
	const filteredInitialItems: BatchItem[] = useMemo((): BatchItem[] => {
		return initialProductVariants.filter((item: BatchItem): boolean => {
			return item.batchId === batchId;
		});
	}, [initialProductVariants, batchId]);

	const displayData: BatchItem[] = useMemo((): BatchItem[] => {
		return batchItems.length > 0 ? batchItems : filteredInitialItems;
	}, [batchItems, filteredInitialItems]);

	// Vì mỗi row là 1 Serial, số lượng chính là độ dài mảng.
	// Nếu sau này bạn gộp nhóm lại có trường quantity, thì dùng reduce.
	const totalQuantity: number = displayData.length;

	// Tính tổng tiền dựa trên giá nhập (costPrice). Ép kiểu an toàn bằng Number()
	const totalAmount: number = useMemo((): number => {
		return displayData.reduce((sum: number, item: BatchItem): number => {
			const price: number = Number(item.costPrice) || 0;
			return sum + price;
		}, 0);
	}, [displayData]);

	// --- Logic Xử lý Sự kiện (Actions) ---
	const handleSelectVariants = (variants: ProductVariantRow[]): void => {
		const parentBatch = batches.find((b) => b.id === batchId);
		const parentProductId = parentBatch?.productId || '';

		const newItems: BatchItem[] = variants.map((v: ProductVariantRow): BatchItem => {
			return {
				id: generateId(),
				productId: parentProductId,
				batchId: batchId,
				productVariantId: v.id,
				productVariantName: v.name,
				costPrice: 0,
			};
		});

		addBatchItems(batchId, newItems);
		setIsModalOpen(false);
	};

	const handleUpdateItem = (itemId: string, fields: Partial<BatchItem>): void => {
		updateBatchItem(batchId, itemId, fields);
	};

	const handleRemoveItem = (itemId: string): void => {
		removeBatchItem(batchId, itemId);
	};

	const handleRedirectToDetail = (row: BatchItem): void => {
		router.push(`/shop-owner/products/${row.productId}/variant/${row.productVariantId}`);
	};

	const handleRedirectToCreateBatchReceipt = (): void => {
		const currentItems = getBatchItems(batchId);

		const calculatedQuantity = currentItems.length;

		const calculatedTotalPrice = currentItems.reduce(
			(sum, item) => sum + (item.costPrice || 0),
			0,
		);

		updateBatch(batchId, {
			quantity: calculatedQuantity,
			totalPrice: calculatedTotalPrice,
		});

		router.back();
	};

	return {
		// Trả về UI State
		isModalOpen,
		setIsModalOpen,
		currentPage,
		changePage,
		totalQuantity,
		totalAmount,
		totalPages: totalPagesFromApi,
		displayData: displayData,
		handleSelectVariants,
		handleUpdateItem,
		handleRemoveItem,
		handleRedirectToDetail,
		handleRedirectToCreateBatchReceipt,
	};
};
