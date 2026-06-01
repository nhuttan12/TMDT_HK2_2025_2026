import { getProductListInBatch } from '@/services/inventories/goods-receipt/goods-receipt-detail-service';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JSX } from 'react';
import ProductVariantListInBatchContainer from './_components/product-variant-list-in-batch-container';

export const metadata: Metadata = {
	title: 'Sản phẩm trong lô hàng',
};

interface Props {
	params: {
		batchId: string;
	};
}

export default async function Page({ params }: Props): Promise<JSX.Element> {
	const { batchId } = await params;

	const batchItems = await getProductListInBatch();

	return (
		<ProductVariantListInBatchContainer
			batchId={batchId}
			productVariants={batchItems}
			mode={'view'}
		/>
	);
}
