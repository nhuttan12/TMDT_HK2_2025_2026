export type GoodsReceiptStatus = 'pending' | 'completed';

const goodsReceiptStatusLabel: Record<GoodsReceiptStatus, string> = {
	pending: 'Đang duyệt',
    completed: 'Đã xác nhận',
};

export function getGoodsReceiptStatusLabel(status: GoodsReceiptStatus): string {
	return goodsReceiptStatusLabel[status];
}