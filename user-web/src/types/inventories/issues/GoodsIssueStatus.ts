export type GoodsIssueStatus = 'draft' | 'confirmed' | 'cancelled';

const goodsIssueStatusLabel: Record<GoodsIssueStatus, string> = {
	draft: 'Bản nháp',
	confirmed: 'Đã xác nhận',
	cancelled: 'Đã huỷ',
};

export function getGoodsIssueStatusLabel(status: GoodsIssueStatus): string {
	return goodsIssueStatusLabel[status];
}
