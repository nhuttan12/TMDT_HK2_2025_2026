export type GoodsReceiptStatus = 'draft' | 'confirmed' | 'cancelled';

const goodsReceiptStatusLabel: Record<GoodsReceiptStatus, string> = {
	draft: 'Bản nháp',
	confirmed: 'Đã xác nhận',
	cancelled: 'Đã huỷ',
};

export function getGoodsReceiptStatusLabel(status: GoodsReceiptStatus): string {
	return goodsReceiptStatusLabel[status];
}