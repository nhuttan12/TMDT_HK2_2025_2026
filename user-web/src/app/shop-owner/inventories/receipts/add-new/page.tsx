import { JSX } from 'react';
import { Metadata } from 'next';
import { GoodsReceiptDetail } from '@/types/inventories/receipts/uis/GoodsReceiptDetail';
import { GoodsReceiptDetailContainer } from '../_components/goods-receipt-detail/goods-receipt-detail-container';

export const metadata: Metadata = {
	title: 'Quản lý chi tiết đơn nhập kho',
};

const emptyGoodsReceiptDetail: GoodsReceiptDetail = {
	id: '',
	code: '',
	supplierID: '',
	supplierName: '',
	importDate: '',
	importStatus: 'pending',
	batches: [],
};

export default function Page(): JSX.Element {
	return (
		<GoodsReceiptDetailContainer
			key={'create'}
			formType={'create'}
			goodsReceipt={emptyGoodsReceiptDetail}
		/>
	);
}
