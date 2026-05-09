'use client';

import {
    useProductAdminFormLogic,
    UseProductAdminFormLogicReturn,
} from '@/hooks/products/admin/use-product-admin-form-logic';
import { useProductDetailAdminQuery } from '@/queries/products/admin/use-product-detail-admin-query';
import { ProductDetailInfoAdmin } from '@/types/products/admin/ProductDetailInfoAdmin';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import { JSX } from 'react';
import ProductAdminFormUI from './product-admin-form-ui';

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
