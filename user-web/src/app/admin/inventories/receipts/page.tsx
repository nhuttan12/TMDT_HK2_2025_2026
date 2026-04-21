import { JSX } from 'react';
import { Metadata } from 'next';
import { GoodsReceiptList } from '@/types/inventories/receipts/uis/GoodsReceiptList';
import { getGoodsReceipts } from '@/services/inventories/goods-receipt/goods-receipt-service';
import GoodsReceiptAdminContainer
	from '@/app/admin/inventories/receipts/_components/goods-receipt-list/goods-receipt-admin-container';

export const metadata: Metadata = {
	title: 'Quản lý hoá đơn nhập kho',
};

export default async function GoodsReceiptsPage(): Promise<JSX.Element> {
	// Fetch data trên Server, truyền xuống Client Container
	const initialReceipts: GoodsReceiptList[] = await getGoodsReceipts();

	return <GoodsReceiptAdminContainer initialReceipts={initialReceipts} />;
}
