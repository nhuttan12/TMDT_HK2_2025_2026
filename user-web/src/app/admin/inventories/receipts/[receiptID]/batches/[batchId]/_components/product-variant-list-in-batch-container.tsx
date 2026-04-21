'use client';

import React, { JSX } from 'react';
import { BatchItemSerial } from '@/types/inventories/receipts/uis/BatchItemSerial';
import { ProductBatchReceiptFormType } from '@/types/inventories/receipts/uis/ProductBatchReceiptFormType';
import {
	useProductVariantListLogic,
	UseProductVariantListLogicReturn,
} from '@/hooks/inventories/goods-receipts/use-product-variant-list-logic';
import { useProductVariantsQuery } from '@/queries/inventories/goods-receipts/products/use-product-variants-query';
import ProductVariantListInBatchUi from '@/app/admin/inventories/receipts/[receiptId]/batches/[batchId]/_components/product-variant-list-in-batch-ui';

interface Props {
	batchId: number;
	productVariants: BatchItemSerial[];
	mode: ProductBatchReceiptFormType;
}

export default function ProductVariantListInBatchContainer({
	batchId,
	productVariants,
	mode,
}: Props): JSX.Element {
	// 1. Data Fetching
	const { data: availableVariants = [] } = useProductVariantsQuery();

	// 2. Gọi Logic Hook duy nhất
	const productVariantListLogic: UseProductVariantListLogicReturn = useProductVariantListLogic({
		batchId,
		initialProductVariants: productVariants,
	});

	return (
		<ProductVariantListInBatchUi
			availableVariants={availableVariants}
			mode={mode}
			{...productVariantListLogic}
		/>
	);
}
