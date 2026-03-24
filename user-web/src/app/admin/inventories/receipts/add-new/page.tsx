import { JSX } from 'react';
import GoodsReceiptDetailClient from '@/app/admin/inventories/receipts/[receiptID]/_components/goods-receipt-detail-client';

export default function Page(): JSX.Element {
	return <GoodsReceiptDetailClient formType={'create'} />;
}
