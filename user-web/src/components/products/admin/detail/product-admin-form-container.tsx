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
import { AppRole } from '@/types/uis/AppRole';

interface ProductAdminFormContainerProps {
	productId?: number;
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
	// Nếu productId bị undefined (do create), ta truyền tạm 0.
	// Query bên dưới sẽ chặn việc gọi API với ID 0.
	const queryId: number = productId || 0;
	const { data: productAdmin } = useProductDetailAdminQuery(queryId, initialProductAdmin);

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
