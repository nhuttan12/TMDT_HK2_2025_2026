import { BatchItem } from '@/types/inventories/receipts/uis/BatchItem';
import { Metadata } from 'next';
import { JSX } from 'react';
import ProductVariantListInBatchContainer from '../_components/product-variant-list-in-batch-container';
import { BackendPagedResult } from '@/types/products/user/productBE';

export const metadata: Metadata = {
	title: 'Nhập thêm sản phẩm vào lô hàng',
};

const mockBatchItemSerials: BackendPagedResult<BatchItem> = {
	items: [],
	totalCount: 0,
	hasNextPage: false,
	hasPreviousPage: false,
	pageNumber: 1,
	pageSize: 10,
	totalPages: 1,
};

interface Props {
	params: {
		batchId: string;
	};
}

export default async function Page({ params }: Props): Promise<JSX.Element> {
	const { batchId } = await params;

	return (
		<ProductVariantListInBatchContainer
			batchId={batchId}
			productVariants={mockBatchItemSerials}
			mode={'create'}
		/>
	);
}
