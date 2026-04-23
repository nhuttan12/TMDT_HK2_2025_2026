'use client';

import React, { JSX } from 'react';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import { ProductDetailInfoAdmin } from '@/types/products/admin/ProductDetailInfoAdmin';
import ProductAdminFormUI from '@/app/admin/products/[productId]/_components/product-admin-form-ui';
import { useProductDetailAdminQuery } from '@/queries/products/admin/use-product-detail-admin-query';
import {
	useProductAdminFormLogic,
	UseProductAdminFormLogicReturn,
} from '@/hooks/products/admin/use-product-admin-form-logic';

interface Props {
	productId?: number;
	formType: AdminFormType;
	initialProductAdmin: ProductDetailInfoAdmin;
}

export default function ProductAdminFormContainer({
	productId,
	formType,
	initialProductAdmin,
}: Props): JSX.Element {
	// 1. Fetching Data
	// Nếu productId bị undefined (do create), ta truyền tạm 0.
	// Query bên dưới sẽ chặn việc gọi API với ID 0.
	const queryId: number = productId || 0;
	const { data: productAdmin } = useProductDetailAdminQuery(queryId, initialProductAdmin);

	// 2. Logic Hook
	const logic: UseProductAdminFormLogicReturn = useProductAdminFormLogic({
		formType: formType,
		productAdmin: productAdmin ?? initialProductAdmin,
	});

	// 3. Render
	return <ProductAdminFormUI {...logic} />;
}
