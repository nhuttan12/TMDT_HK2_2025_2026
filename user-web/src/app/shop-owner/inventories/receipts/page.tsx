import { JSX } from 'react';
import { Metadata } from 'next';
import { GoodsReceiptList } from '@/types/inventories/receipts/uis/GoodsReceiptList';
import { getGoodsReceiptListMocking, GoodsReceiptService } from '@/services/inventories/goods-receipt/goods-receipt-service';
import GoodsReceiptAdminContainer from './_components/goods-receipt-list/goods-receipt-admin-container';
import apiServer from '@/lib/api-server';

export const metadata: Metadata = {
	title: 'Quản lý hoá đơn nhập kho',
};

export default async function GoodsReceiptsPage(): Promise<JSX.Element> {
	// Fetch data trên Server, truyền xuống Client Container

    const receiptService = new GoodsReceiptService(apiServer);

	const initialReceipts = await receiptService.getGoodsReceiptList();

	return <GoodsReceiptAdminContainer initialReceipts={initialReceipts} />;
}
