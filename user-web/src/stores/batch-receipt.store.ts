import { create, StoreApi, UseBoundStore } from 'zustand';
import { GoodsReceiptBatch } from '@/types/inventories/receipts/uis/GoodsReceiptBatch';
import { BatchItem } from '@/types/inventories/receipts/uis/BatchItem';
import { persist } from 'zustand/middleware';
import { GoodsReceiptDetail } from '@/types/inventories/receipts/uis/GoodsReceiptDetail';

export interface BatchReceiptStore {
	// ===== State =====
	batches: GoodsReceiptBatch[];

	// key = batchId
	batchItemsByBatchId: Record<string, BatchItem[]>;

	// internal id generator
	idCounter: number;

	draftKey: string | null;

	receiptForm: GoodsReceiptDetail | null;

	setDraftKey: (key: string | null) => void;

	// ===== Actions =====
	generateId: () => string;

	setBatches: (batches: GoodsReceiptBatch[]) => void;

	addBatch: (batch: GoodsReceiptBatch) => void;

	updateBatch: (id: string, updates: Partial<GoodsReceiptBatch>) => void;

	removeBatch: (id: string) => void;

	// ===== Batch Items =====
	addBatchItems: (batchId: string, items: BatchItem[]) => void;

	getBatchItems: (batchId: string) => BatchItem[];

	updateBatchItem: (batchId: string, itemId: string, updates: Partial<BatchItem>) => void;

	removeBatchItem: (batchId: string, itemId: string) => void;

	clearBatchItems: (batchId: string) => void;

	// ===== Receipt =====
	initReceiptForm: (form: GoodsReceiptDetail) => void;
	updateReceiptFieldStore: <K extends keyof GoodsReceiptDetail>(
		key: K,
		value: GoodsReceiptDetail[K],
	) => void;

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

				receiptForm: null,

				// ===== ID Generator =====
				generateId: (): string => {
					return crypto.randomUUID();
				},

				draftKey: null,

				setDraftKey: (key: string | null): void => {
					set({ draftKey: key });
				},

				// ===== Batch =====
				setBatches: (batches: GoodsReceiptBatch[]): void => {
					set((state: BatchReceiptStore) => ({
						batches,
						receiptForm: state.receiptForm ? { ...state.receiptForm, batches } : null,
					}));
				},

				addBatch: (batch: GoodsReceiptBatch): void => {
					set((state: BatchReceiptStore) => {
						const nextBatches = [...state.batches, batch];
						return {
							batches: nextBatches,
							receiptForm: state.receiptForm
								? { ...state.receiptForm, batches: nextBatches }
								: null,
						};
					});
				},

				updateBatch: (id: string, updates: Partial<GoodsReceiptBatch>): void => {
					set((state: BatchReceiptStore) => {
						const nextBatches = state.batches.map(
							(b: GoodsReceiptBatch): GoodsReceiptBatch =>
								b.id === id ? { ...b, ...updates } : b,
						);
						return {
							batches: nextBatches,
							receiptForm: state.receiptForm
								? { ...state.receiptForm, batches: nextBatches }
								: null,
						};
					});
				},

				removeBatch: (id: string): void => {
					set((state: BatchReceiptStore) => {
						const newBatchItems = { ...state.batchItemsByBatchId };
						delete newBatchItems[id];

						const nextBatches = state.batches.filter(
							(b: GoodsReceiptBatch): boolean => b.id !== id,
						);

						return {
							batches: nextBatches,
							batchItemsByBatchId: newBatchItems,
							receiptForm: state.receiptForm
								? { ...state.receiptForm, batches: nextBatches }
								: null,
						};
					});
				},

				// ===== Batch Items =====
				addBatchItems: (batchId: string, items: BatchItem[]): void => {
					set((state: BatchReceiptStore) => {
						return {
							batchItemsByBatchId: {
								...state.batchItemsByBatchId,
								[batchId]: items,
							},
						};
					});
				},

				getBatchItems: (batchId: string): BatchItem[] => {
					return get().batchItemsByBatchId[batchId] || [];
				},

				updateBatchItem: (
					batchId: string,
					itemId: string,
					updates: Partial<BatchItem>,
				): void => {
					set((state: BatchReceiptStore) => ({
						batchItemsByBatchId: {
							...state.batchItemsByBatchId,
							[batchId]: (state.batchItemsByBatchId[batchId] || []).map(
								(item: BatchItem): BatchItem =>
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
								(item: BatchItem): boolean => item.id !== itemId,
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

				initReceiptForm: (form: GoodsReceiptDetail): void => {
					set({ receiptForm: form });
				},

				updateReceiptFieldStore: <K extends keyof GoodsReceiptDetail>(
					key: K,
					value: GoodsReceiptDetail[K],
				): void => {
					set((state: BatchReceiptStore) => {
						const currentForm =
							state.receiptForm ||
							({
								id: crypto.randomUUID(),
								code: '',
								supplierID: '',
								supplierName: '',
								importDate: new Date().toISOString(),
								importStatus: 'pending',
								batches: [],
								note: '',
							} as GoodsReceiptDetail);

						return {
							receiptForm: { ...currentForm, [key]: value },
						};
					});
				},

				// ===== Reset toàn bộ receipt =====
				reset: (): void => {
					set({
						batches: [],
						batchItemsByBatchId: {},
						idCounter: 1,
						receiptForm: null,
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
