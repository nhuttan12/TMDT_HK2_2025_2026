'use client';

import { useProductAdminLogic } from '@/hooks/products/admin/use-product-admin-logic';
import { useProductListInfoAdminQuery } from '@/queries/products/admin/use-product-list-info-admin-query';
import { ProductListInfoAdmin } from '@/types/products/admin/ProductListInfoAdmin';
import { AppRole } from '@/types/uis/AppRole';
import { JSX } from 'react';
import ProductAdminUi from './product-admin-ui';

interface ProductAdminContainerProps {
	initialProducts: ProductListInfoAdmin[];
	role: AppRole;
	productApproval?: boolean;
	addLabel?: string;
	customTitle?: string;
	customDescription?: string;
}

export default function ProductAdminContainer({
	initialProducts,
	addLabel,
	role,
	productApproval,
    customTitle,
    customDescription
}: ProductAdminContainerProps): JSX.Element {
	// 1. Data Source
	const { data: products, isLoading: isProductsLoading } =
		useProductListInfoAdminQuery(initialProducts);

	// 2. Logic Hook
	const logic = useProductAdminLogic({ role, productApproval });

	const isPageLoading: boolean = isProductsLoading;

	if (isPageLoading && (!products || products.length === 0)) {
		return <div className='p-4 text-gray-500'>Đang tải dữ liệu...</div>;
	}

	// 3. Truyền dữ liệu và hàm xử lý
	return (
		<ProductAdminUi
			products={products ?? []}
			addLabel={addLabel}
			productApproval={productApproval}
            customTitle={customTitle}
            customDescription={customDescription}
			{...logic}
		/>
	);
}
