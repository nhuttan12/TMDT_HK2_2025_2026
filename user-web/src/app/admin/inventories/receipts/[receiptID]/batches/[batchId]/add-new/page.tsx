import { JSX } from 'react';
import { BatchItemSerial } from '@/types/inventories/receipts/uis/BatchItemSerial';
import { Metadata } from 'next';
import ProductVariantListInBatchContainer
	from '@/app/admin/inventories/receipts/[receiptId]/batches/[batchId]/_components/product-variant-list-in-batch-container';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
	title: 'Nhập thêm sản phẩm vào lô hàng',
};

const mockBatchItemSerials: BatchItemSerial[] = [];

interface Props {
	params: {
		batchId: string;
	};
}

export default async function Page({ params }: Props): Promise<JSX.Element> {
	const { batchId } = await params;

	const id: number = Number(batchId);

	if (!id || Number.isNaN(id)) {
		notFound();
	}

	return (
		<ProductVariantListInBatchContainer
			batchId={id}
			productVariants={mockBatchItemSerials}
			mode={'create'}
		/>
	);
}
