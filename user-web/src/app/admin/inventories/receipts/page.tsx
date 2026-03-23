import { JSX } from 'react';
import GoodsReceiptAdminPageClient from '@/app/admin/inventories/receipts/_components/goods-receipt-admin-page-client';
import { Metadata } from 'next';
import { GoodsReceiptList } from '@/types/inventories/receipts/GoodsReceiptList';

const mockGoodsReceipts: GoodsReceiptList[] = [
	{
		id: 1,
		code: 'PNK-001',
		supplierName: 'Công ty ABC',
		importDate: new Date().toISOString(),
		status: 'draft',
		totalQuantity: 10,
		totalAmount: 2000000,
	},
	{
		id: 2,
		code: 'PNK-002',
		supplierName: 'Công ty XYZ',
		importDate: new Date().toISOString(),
		status: 'confirmed',
		totalQuantity: 5,
		totalAmount: 1000000,
	},
];

export const metadata: Metadata = {
	title: 'Quản lý hoá đơn nhập kho',
};

export default function Page(): JSX.Element {
	return <GoodsReceiptAdminPageClient receipts={mockGoodsReceipts} />;
}
