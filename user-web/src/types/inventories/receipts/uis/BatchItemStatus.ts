export type BatchItemStatus = 'in_stock' | 'sold' | 'defective';

const batchItemStatusLabel: Record<BatchItemStatus, string> = {
	in_stock: 'Trong kho',
	sold: 'Đã bán',
	defective: 'Lỗi',
};

export function getBatchItemStatusLabel(status: BatchItemStatus): string {
	return batchItemStatusLabel[status];
}