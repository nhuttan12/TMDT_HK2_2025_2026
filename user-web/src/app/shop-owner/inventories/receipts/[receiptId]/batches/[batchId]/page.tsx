import { getProductListInBatch } from '@/services/inventories/goods-receipt/goods-receipt-detail-service';
import { Metadata } from 'next';
import { JSX } from 'react';
import ProductVariantListInBatchContainer from './_components/product-variant-list-in-batch-container';

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

	const batchItems = await getProductListInBatch(batchId, receiptId);

	return (
		<ProductVariantListInBatchContainer
			batchId={batchId}
			productVariants={batchItems}
			mode={'view'}
		/>
	);
}
