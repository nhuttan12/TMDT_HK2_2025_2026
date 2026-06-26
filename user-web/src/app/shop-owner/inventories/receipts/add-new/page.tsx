import { JSX } from 'react';
import { Metadata } from 'next';
import { GoodsReceiptDetail } from '@/types/inventories/receipts/uis/GoodsReceiptDetail';
import { GoodsReceiptDetailContainer } from '../_components/goods-receipt-detail/goods-receipt-detail-container';
import { getSupplierOptionsByShopId } from '@/services/inventories/suppliers/goods-supplier-service';

export const metadata: Metadata = {
	title: 'Quản lý chi tiết đơn nhập kho',
};

const emptyGoodsReceiptDetail: GoodsReceiptDetail = {
	id: '',
	code: '',
	supplierID: '',
	supplierName: '',
	importDate: '',
	importStatus: 'pending',
	batches: [],
};

export default async function Page(): Promise<JSX.Element> {
	const supplierOptions = await getSupplierOptionsByShopId(
		'e6a8b7c2-58cc-4b01-90e6-d701748f0851',
	);

	return (
		<GoodsReceiptDetailContainer
			key={'create'}
			formType={'create'}
			goodsReceipt={emptyGoodsReceiptDetail}
            supplierOptions={supplierOptions}
		/>
	);
}
