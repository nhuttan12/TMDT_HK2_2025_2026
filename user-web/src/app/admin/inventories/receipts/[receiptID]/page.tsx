import { JSX } from 'react';
import { Metadata } from 'next';
import GoodsReceiptDetailContainer from '@/app/admin/inventories/receipts/_components/goods-receipt-detail-container';
import { GoodsReceiptDetail } from '@/types/inventories/receipts/uis/GoodsReceiptDetail';

export const metadata: Metadata = {
	title: 'Thông tin chi tiết đơn nhập kho',
};

const mockGoodsReceiptDetails: GoodsReceiptDetail = {
	id: 1,
	code: 'PNK-001',
	supplierID: 1,
	supplierName: 'Công ty ABC',
	importDate: new Date().toISOString(),
	importStatus: 'draft',
	note: 'Hàng test',
	batches: [
		{
			id: 1,
			productId: 101,
			productName: 'iPhone 15 Pro Max',
			batchNumber: 'BATCH-001',
			quantity: 10,
			unitPrice: 30000000,
			totalPrice: 300000000,
			manufacturedAt: '2025-01-01',
			expiredAt: undefined,
			isSerialInputted: true,
		},
		{
			id: 2,
			productId: 102,
			productName: 'Samsung S24 Ultra',
			batchNumber: 'BATCH-002',
			quantity: 5,
			unitPrice: 25000000,
			totalPrice: 125000000,
			isSerialInputted: false,
		},
	],
};

export default function Page(): JSX.Element {
	return (
		<GoodsReceiptDetailContainer
			key={'view'}
			formType={'view'}
			goodsReceipt={mockGoodsReceiptDetails}
		/>
	);
}
