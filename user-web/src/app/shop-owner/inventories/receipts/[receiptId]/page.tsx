import apiServer from '@/lib/api-server';
import {
    GoodsReceiptDetailService
} from '@/services/inventories/goods-receipt/goods-receipt-detail-service';
import { Metadata } from 'next';
import { JSX } from 'react';
import { GoodsReceiptDetailContainer } from '../_components/goods-receipt-detail/goods-receipt-detail-container';

export const metadata: Metadata = {
	title: 'Thông tin chi tiết đơn nhập kho',
};

interface PageProps {
	params: Promise<{ receiptId: string }>;
}

export default async function Page({ params }: PageProps): Promise<JSX.Element> {
	const { receiptId } = await params;

	const receiptDetailService = new GoodsReceiptDetailService(apiServer);

	const initialReceiptDetail =
		await receiptDetailService.getGoodsReceiptDetailByReceiptId(receiptId);

	return (
		<GoodsReceiptDetailContainer
			key={'view'}
			formType={'view'}
			goodsReceipt={initialReceiptDetail} // Truyền dữ liệu thật xuống thay vì biến mock cứng
		/>
	);
}
