import { JSX } from 'react';
import GoodsReceiptAdminPageClient from '@/app/admin/inventories/receipts/_components/goods-receipt-admin-page-client';
import { Metadata } from 'next';
import { GoodsReceiptList } from '@/types/inventories/receipts/uis/GoodsReceiptList';

const mockGoodsReceipts: GoodsReceiptList[] = [
	{
		id: 1,
		code: 'PNK-20260321-001',
		supplierName: 'Công ty TNHH ABC',
		importDate: new Date().toISOString(),
		totalBatches: 3,           // Có 3 lô hàng khác nhau trong phiếu này
		totalQuantity: 15,         // Tổng cộng 15 chiếc điện thoại
		totalAmount: 350000000,    // 350 triệu VNĐ
		status: 'draft',
		createdByName: 'Phạm Nhựt Tân',
	},
	{
		id: 2,
		code: 'PNK-20260324-002',
		supplierName: 'Nhà phân phối XYZ',
		importDate: new Date().toISOString(),
		totalBatches: 1,           // Chỉ nhập 1 lô duy nhất
		totalQuantity: 50,         // Nhưng số lượng máy trong lô rất lớn
		totalAmount: 1250000000,   // 1 tỷ 250 triệu VNĐ
		status: 'confirmed',
		createdByName: 'Nguyễn Văn Quản Lý',
	},
	{
		id: 3,
		code: 'PNK-20260325-003',
		supplierName: 'Apple Vietnam',
		importDate: new Date().toISOString(),
		totalBatches: 5,
		totalQuantity: 100,
		totalAmount: 2500000000,
		status: 'cancelled',
		createdByName: 'Phạm Nhựt Tân',
	},
];

export const metadata: Metadata = {
	title: 'Quản lý hoá đơn nhập kho',
};

export default function Page(): JSX.Element {
	return <GoodsReceiptAdminPageClient receipts={mockGoodsReceipts} />;
}
