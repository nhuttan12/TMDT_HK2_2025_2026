import { JSX } from 'react';
import { Metadata } from 'next';
import GoodsReceiptDetailClient from '@/app/admin/inventories/receipts/[receiptID]/_components/goods-receipt-detail-client';

export const metadata: Metadata = {
	title: 'Chỉnh sửa thông tin đơn nhập kho',
};

export default function Page(): JSX.Element {
	return <GoodsReceiptDetailClient formType={'update'} />;
}
