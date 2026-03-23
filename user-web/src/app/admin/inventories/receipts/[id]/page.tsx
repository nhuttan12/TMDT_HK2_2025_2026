import { JSX } from 'react';
import { Metadata } from 'next';
import GoodsReceiptDetail from '@/app/admin/inventories/receipts/[id]/_components/goods-receipt-detail-client';
import { GoodsReceipt } from '@/types/inventories/receipts/GoodsReceipt';

export const metadata: Metadata = {
	title: 'Chi tiết hoá đơn nhập kho',
};

const mockGoodsReceipt: GoodsReceipt = {
	id: 1,
	code: 'PNK-20260321-001',

	supplier: {
		id: 101,
		code: 'NCC001',
		name: 'Công ty TNHH ABC',
		contactName: 'Nguyễn Văn A',
		phone: '0901234567',
		email: 'contact@abc.com',
		address: '123 Nguyễn Trãi, Q1, TP.HCM',
	},

	warehouseID: 1,

	createdBy: 10,
	createdByName: 'Admin',

	importDate: new Date().toISOString(),

	status: 'draft',

	note: 'Nhập hàng đợt 1',

	items: [
		{
			id: 1,
			productID: 1001,
			productName: 'iPhone 15 Pro Max',
			sku: 'IP15PM-256GB',

			quantity: 5,
			unitPrice: 30000000,
			totalPrice: 150000000,

			batchNumber: 'BATCH-001',
			expiredAt: undefined,
			note: 'Hàng chính hãng',
		},
		{
			id: 2,
			productID: 1002,
			productName: 'Samsung Galaxy S24',
			sku: 'SS-S24-128GB',

			quantity: 10,
			unitPrice: 20000000,
			totalPrice: 200000000,

			batchNumber: 'BATCH-002',
			note: 'Có hộp đầy đủ',
		},
	],

	totalQuantity: 15,
	totalAmount: 350000000,

	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),

	confirmedAt: undefined,
	cancelledAt: undefined,
};

export default function Page(): JSX.Element {
	return (
		<GoodsReceiptDetail
			formType={'view'}
			receipt={mockGoodsReceipt}
		/>
	);
}
