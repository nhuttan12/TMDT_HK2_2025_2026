import { JSX } from 'react';
import GoodsReceiptDetailContainer from '@/app/admin/inventories/receipts/_components/goods-receipt-detail-container';
import { Metadata } from 'next';
import { GoodsReceiptDetail } from '@/types/inventories/receipts/uis/GoodsReceiptDetail';

export const metadata: Metadata = {
	title: 'Quản lý chi tiết đơn nhập kho',
};

const emptyGoodsReceiptDetail: GoodsReceiptDetail = {
	id: 0,
	code: '',
	supplierID: 0,
	supplierName: '',
	importDate: '',
	importStatus: 'draft',
	batches: [],
};

export default function Page(): JSX.Element {
	return (
		<GoodsReceiptDetailContainer
			formType={'create'}
			goodsReceipt={emptyGoodsReceiptDetail}
		/>
	);
}
