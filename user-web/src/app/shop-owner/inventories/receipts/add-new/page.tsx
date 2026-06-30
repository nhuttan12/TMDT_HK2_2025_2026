import apiServer from '@/lib/api-server';
import { GoodsSupplierService } from '@/services/inventories/suppliers/goods-supplier-service';
import { GoodsReceiptDetail } from '@/types/inventories/receipts/uis/GoodsReceiptDetail';
import { Metadata } from 'next';
import { JSX } from 'react';
import { GoodsReceiptDetailContainer } from '../_components/goods-receipt-detail/goods-receipt-detail-container';

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
    const goodsSupplierService = new GoodsSupplierService(apiServer);
    
	const supplierOptions = await goodsSupplierService.getSupplierOptionsByShopId();

	return (
		<GoodsReceiptDetailContainer
			key={'create'}
			formType={'create'}
			goodsReceipt={emptyGoodsReceiptDetail}
			supplierOptions={supplierOptions}
		/>
	);
}
