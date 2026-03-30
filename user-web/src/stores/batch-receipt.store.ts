import { create, StoreApi, UseBoundStore } from 'zustand';
import { GoodsReceiptBatch } from '@/types/inventories/receipts/uis/GoodsReceiptBatch';
import { BatchItemSerial } from '@/types/inventories/receipts/uis/BatchItemSerial';

export interface BatchReceiptStore {
	// ===== State =====
	batches: GoodsReceiptBatch[];

	// key = batchId
	batchItemsByBatchId: Record<number, BatchItemSerial[]>;

	// internal id generator
	idCounter: number;

	// ===== Actions =====
	generateId: () => number;

	setBatches: (batches: GoodsReceiptBatch[]) => void;

	addBatch: (batch: GoodsReceiptBatch) => void;

	updateBatch: (id: number, updates: Partial<GoodsReceiptBatch>) => void;

	removeBatch: (id: number) => void;

	// ===== Batch Items =====
	addBatchItems: (batchId: number, items: BatchItemSerial[]) => void;

	getBatchItems: (batchId: number) => BatchItemSerial[];

	updateBatchItem: (batchId: number, itemId: number, updates: Partial<BatchItemSerial>) => void;

	removeBatchItem: (batchId: number, itemId: number) => void;

	clearBatchItems: (batchId: number) => void;

	// ===== Reset =====
	reset: () => void;
}

export const useBatchReceiptStore: UseBoundStore<StoreApi<BatchReceiptStore>> =
	create<BatchReceiptStore>((set, get) => ({
		// ===== Initial State =====
		batches: [],
		batchItemsByBatchId: {},
		idCounter: 1,

		// ===== ID Generator =====
		generateId: (): number => {
			const id = get().idCounter;
			set({ idCounter: id + 1 });
			return id;
		},

		// ===== Batch =====
		setBatches: (batches: GoodsReceiptBatch[]): void => set({ batches }),

		addBatch: (batch: GoodsReceiptBatch): void => {
			set((state: BatchReceiptStore) => ({
				batches: [...state.batches, batch],
			}));
		},

		updateBatch: (id: number, updates: Partial<GoodsReceiptBatch>): void => {
			set((state: BatchReceiptStore) => ({
				batches: state.batches.map(
					(b: GoodsReceiptBatch): GoodsReceiptBatch =>
						b.id === id ? { ...b, ...updates } : b,
				),
			}));
		},

		removeBatch: (id: number): void => {
			set((state: BatchReceiptStore) => {
				const newBatchItems = { ...state.batchItemsByBatchId };
				delete newBatchItems[id];

				return {
					batches: state.batches.filter((b: GoodsReceiptBatch): boolean => b.id !== id),
					batchItemsByBatchId: newBatchItems,
				};
			});
		},

		// ===== Batch Items =====
		addBatchItems: (batchId: number, items: BatchItemSerial[]): void => {
			set((state: BatchReceiptStore) => {
				const existing: BatchItemSerial[] = state.batchItemsByBatchId[batchId] || [];

				const next = {
					...state.batchItemsByBatchId,
					[batchId]: [...existing, ...items],
				};

				console.log('ZUSTAND BEFORE:', state.batchItemsByBatchId);
				console.log('ZUSTAND AFTER:', next);

				return {
					batchItemsByBatchId: next,
				};
			});
		},

		getBatchItems: (batchId: number): BatchItemSerial[] => {
			return get().batchItemsByBatchId[batchId] || [];
		},

		updateBatchItem: (
			batchId: number,
			itemId: number,
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

		clearBatchItems: (batchId: number): void => {
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
	}));
