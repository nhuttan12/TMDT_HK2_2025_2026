import { GoodsIssueType } from './GoodsIssueType';

const GOODS_ISSUE_TYPE_LABEL: Record<GoodsIssueType, string> = {
	retail: 'Bán lẻ',
	wholesale: 'Bán sỉ',
	return_defective: 'Trả hàng hỏng',
};

export function getGoodsIssueTypeLabel(type: GoodsIssueType): string {
	const label: string | undefined = GOODS_ISSUE_TYPE_LABEL[type];
	return label ?? 'Không xác định';
}