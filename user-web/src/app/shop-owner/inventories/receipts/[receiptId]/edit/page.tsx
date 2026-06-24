import { JSX } from 'react';
import { Metadata } from 'next';
import { GoodsReceiptDetail } from '@/types/inventories/receipts/uis/GoodsReceiptDetail';
import { getGoodsReceiptDetailByReceiptId } from '@/services/inventories/goods-receipt/goods-receipt-detail-service';
import { GoodsReceiptDetailContainer } from '../../_components/goods-receipt-detail/goods-receipt-detail-container';

export const metadata: Metadata = {
	title: 'Chỉnh sửa thông tin đơn nhập kho',
};

interface PageProps {
	params: { receiptId: string }; // Giả sử route của bạn là [receiptId]
}

export default async function Page({ params }: PageProps): Promise<JSX.Element> {
    const id = await params.receiptId;

	// Gọi trực tiếp hàm Service trên Server để lấy initial data
	const initialReceiptDetail = await getGoodsReceiptDetailByReceiptId(id);

	return (
		<GoodsReceiptDetailContainer
			key={'update'}
			formType={'update'}
			goodsReceipt={initialReceiptDetail} // Truyền dữ liệu thật xuống thay vì biến mock cứng
		/>
	);
}