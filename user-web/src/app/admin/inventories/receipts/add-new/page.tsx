import { JSX } from 'react';
import GoodsReceiptDetailClient from '@/app/admin/inventories/receipts/[receiptID]/_components/goods-receipt-detail-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Quản lý chi tiết đơn nhập kho',
};

export default function Page(): JSX.Element {
	return <GoodsReceiptDetailClient formType={'create'} />;
}
