'use client';

import {
    useProductVariantListLogic
} from '@/hooks/inventories/goods-receipts/use-product-variant-list-logic';
import { useProductVariantsQuery } from '@/queries/inventories/goods-receipts/products/use-product-variants-query';
import { BatchItem } from '@/types/inventories/receipts/uis/BatchItem';
import { ProductBatchReceiptFormType } from '@/types/inventories/receipts/uis/ProductBatchReceiptFormType';
import { JSX } from 'react';
import ProductVariantListInBatchUi from './product-variant-list-in-batch-ui';
import { BackendPagedResult } from '@/types/products/user/productBE';

interface Props {
	batchId: string;
	productVariants: BackendPagedResult<BatchItem>;
	mode: ProductBatchReceiptFormType;
}

export default function ProductVariantListInBatchContainer({
	batchId,
	productVariants,
	mode,
}: Props): JSX.Element {
	// 1. Data Fetching
	const { data: availableVariants } = useProductVariantsQuery();

	// 2. Gọi Logic Hook duy nhất
	const productVariantListLogic = useProductVariantListLogic({
		batchId,
		initialProductVariants: productVariants.items,
		totalPagesFromApi: availableVariants?.meta.totalPages,
	});

	const resolveVariant = availableVariants?.data ?? [];

	// 3. Truyền dữ liệu xuống Dumb Component UI bằng Spread Operator

	return (
		<ProductVariantListInBatchUi
			availableVariants={resolveVariant}
			mode={mode}
			{...productVariantListLogic}
		/>
	);
}
