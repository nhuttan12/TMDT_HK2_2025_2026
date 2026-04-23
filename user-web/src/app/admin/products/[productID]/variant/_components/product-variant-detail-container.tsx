'use client';

import { ProductVariantDetail } from '@/types/products/admin/variant/ProductVariantDetail';
import { FormEvent, JSX, SyntheticEvent, useEffect, useState } from 'react';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import ProductVariantDetailUI from '@/app/admin/products/[productId]/variant/_components/product-variant-detail-ui';
import { useProductVariantLogic, UseProductVariantLogicReturn } from '@/hooks/products/admin/use-product-variant-logic';
import { useProductVariantDetailQuery } from '@/queries/products/admin/use-product-variant-detail-query';

interface ProductVariantDetailContainerProps {
	initialData: ProductVariantDetail;
	mode: AdminFormType;
}

export default function ProductVariantDetailContainer({
	initialData,
	mode,
}: ProductVariantDetailContainerProps): JSX.Element {
	// 1. Quản lý Server State bằng Tanstack Query
	// initialData đóng vai trò là "dữ liệu mồi" (hydration) từ Server Component
	const { data: variantData } = useProductVariantDetailQuery(initialData.id, initialData);

	const logic: UseProductVariantLogicReturn = useProductVariantLogic({
		initialData: variantData ?? initialData,
		mode: mode,
	});

	return (
		<ProductVariantDetailUI
			{...logic}
			disabled={logic.isView || logic.loading}
		/>
	);
}
