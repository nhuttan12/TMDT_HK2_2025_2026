import {
	getProductListInBatchMocking,
	GoodsReceiptDetailService,
} from '@/services/inventories/goods-receipt/goods-receipt-detail-service';
import { Metadata } from 'next';
import { JSX } from 'react';
import ProductVariantListInBatchContainer from './_components/product-variant-list-in-batch-container';
import apiServer from '@/lib/api-server';

export const metadata: Metadata = {
	title: 'Sản phẩm trong lô hàng',
};

interface Props {
	params: Promise<{
		receiptId: string;
		batchId: string;
	}>;
}

export default async function Page({ params }: Props): Promise<JSX.Element> {
	const { receiptId, batchId } = await params;

	const receiptDetailService = new GoodsReceiptDetailService(apiServer);

	const batchItems = await receiptDetailService.getProductListInBatch(batchId, receiptId);

	return (
		<ProductVariantListInBatchContainer
			batchId={batchId}
			productVariants={batchItems}
			mode={'view'}
		/>
	);
}
