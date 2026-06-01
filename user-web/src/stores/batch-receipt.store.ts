import { create, StoreApi, UseBoundStore } from 'zustand';
import { GoodsReceiptBatch } from '@/types/inventories/receipts/uis/GoodsReceiptBatch';
import { BatchItemSerial } from '@/types/inventories/receipts/uis/BatchItemSerial';
import { persist } from 'zustand/middleware';

export interface BatchReceiptStore {
	// ===== State =====
	batches: GoodsReceiptBatch[];

	// key = batchId
	batchItemsByBatchId: Record<string, BatchItemSerial[]>;

	// internal id generator
	idCounter: number;

	draftKey: string | null;

	setDraftKey: (key: string | null) => void;

	// ===== Actions =====
	generateId: () => string;

	setBatches: (batches: GoodsReceiptBatch[]) => void;

	addBatch: (batch: GoodsReceiptBatch) => void;

	updateBatch: (id: string, updates: Partial<GoodsReceiptBatch>) => void;

	removeBatch: (id: string) => void;

	// ===== Batch Items =====
	addBatchItems: (batchId: string, items: BatchItemSerial[]) => void;

	getBatchItems: (batchId: string) => BatchItemSerial[];

	updateBatchItem: (batchId: string, itemId: string, updates: Partial<BatchItemSerial>) => void;

	removeBatchItem: (batchId: string, itemId: string) => void;

	clearBatchItems: (batchId: string) => void;

	// ===== Reset =====
	reset: () => void;
}

export const useBatchReceiptStore: UseBoundStore<StoreApi<BatchReceiptStore>> =
	create<BatchReceiptStore>()(
		persist(
			(set, get) => ({
				// ===== Initial State =====
				batches: [],
				batchItemsByBatchId: {},
				idCounter: 1,

				// ===== ID Generator =====
				generateId: (): string => {
					return crypto.randomUUID();
				},

				draftKey: null,

				setDraftKey: (key: string | null): void => {
					set({ draftKey: key });
				},

				// ===== Batch =====
				setBatches: (batches: GoodsReceiptBatch[]): void => set({ batches }),

				addBatch: (batch: GoodsReceiptBatch): void => {
					set((state: BatchReceiptStore) => ({
						batches: [...state.batches, batch],
					}));
				},

				updateBatch: (id: string, updates: Partial<GoodsReceiptBatch>): void => {
					set((state: BatchReceiptStore) => ({
						batches: state.batches.map(
							(b: GoodsReceiptBatch): GoodsReceiptBatch =>
								b.id === id ? { ...b, ...updates } : b,
						),
					}));
				},

				removeBatch: (id: string): void => {
					set((state: BatchReceiptStore) => {
						const newBatchItems = { ...state.batchItemsByBatchId };
						delete newBatchItems[id];

						return {
							batches: state.batches.filter(
								(b: GoodsReceiptBatch): boolean => b.id !== id,
							),
							batchItemsByBatchId: newBatchItems,
						};
					});
				},

				// ===== Batch Items =====
				addBatchItems: (batchId: string, items: BatchItemSerial[]): void => {
					set((state: BatchReceiptStore) => {
						return {
							batchItemsByBatchId: {
								...state.batchItemsByBatchId,
								[batchId]: items,
							},
						};
					});
				},

				getBatchItems: (batchId: string): BatchItemSerial[] => {
					return get().batchItemsByBatchId[batchId] || [];
				},

				updateBatchItem: (
					batchId: string,
					itemId: string,
					updates: Partial<BatchItemSerial>,
				): void => {
					set((state: BatchReceiptStore) => ({
						batchItemsByBatchId: {
							...state.batchItemsByBatchId,
							[batchId]: (state.batchItemsByBatchId[batchId] || []).map(
								(item: BatchItemSerial): BatchItemSerial =>
									item.id === itemId ? { ...item, ...updates } : item,
							),
						},
					}));
				},

				removeBatchItem: (batchId, itemId) => {
					set((state: BatchReceiptStore) => ({
						batchItemsByBatchId: {
							...state.batchItemsByBatchId,
							[batchId]: (state.batchItemsByBatchId[batchId] || []).filter(
								(item: BatchItemSerial): boolean => item.id !== itemId,
							),
						},
					}));
				},

				clearBatchItems: (batchId: string): void => {
					set((state: BatchReceiptStore) => ({
						batchItemsByBatchId: {
							...state.batchItemsByBatchId,
							[batchId]: [],
						},
					}));
				},

				// ===== Reset toàn bộ receipt =====
				reset: (): void => {
					set({
						batches: [],
						batchItemsByBatchId: {},
						idCounter: 1,
					});
				},
			}),
			{
				name: 'batch-receipt-storage',
				partialize: (state: BatchReceiptStore) => ({
					batches: state.batches,
					batchItemsByBatchId: state.batchItemsByBatchId,
				}),
			},
		),
	);
