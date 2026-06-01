'use client';

import {
    useProductAdminFormLogic
} from '@/hooks/products/admin/use-product-admin-form-logic';
import { useProductDetailAdminQuery } from '@/queries/products/admin/use-product-detail-admin-query';
import { ProductDetailInfoAdmin } from '@/types/products/admin/ProductDetailInfoAdmin';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import { AppRole } from '@/types/uis/AppRole';
import { JSX } from 'react';
import ProductAdminFormUI from './product-admin-form-ui';

interface ProductAdminFormContainerProps {
	productId?: string;
	formType: AdminFormType;
	initialProductAdmin: ProductDetailInfoAdmin;
	role: AppRole;
	productApproval?: boolean;
}

export default function ProductAdminFormContainer({
	productId,
	formType,
	initialProductAdmin,
	role,
	productApproval,
}: ProductAdminFormContainerProps): JSX.Element {
	// 1. Fetching Data
	const { data: productAdmin } = useProductDetailAdminQuery(productId || '', initialProductAdmin);

	// 2. Logic Hook
	const logic = useProductAdminFormLogic({
		formType,
		productAdmin: productAdmin ?? initialProductAdmin,
		role,
		productApproval,
	});

	// 3. Render
	return (
		<ProductAdminFormUI
			{...logic}
			productApproval={productApproval}
		/>
	);
}
