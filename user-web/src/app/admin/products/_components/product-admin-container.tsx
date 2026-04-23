'use client';

import { JSX } from 'react';
import { ProductListInfoAdmin } from '@/types/products/admin/ProductListInfoAdmin';
import { ProductAdminFilterValues } from '@/types/products/admin/ProductAdminFilterValues';
import { FilterField } from '@/types/uis/FilterField';
import ProductAdminUi from '@/app/admin/products/_components/product-admin-ui';
import { useProductListInfoAdminQuery } from '@/queries/products/admin/use-product-list-info-admin-query';
import {
	useProductAdminLogic,
	UseProductAdminLogicReturn,
} from '@/hooks/products/admin/use-product-admin-logic';

interface Props {
	initialProducts: ProductListInfoAdmin[];
}

export default function ProductAdminContainer({ initialProducts }: Props): JSX.Element {
	// 1. Data Source
	const { data: products, isLoading: isProductsLoading } =
		useProductListInfoAdminQuery(initialProducts);

	// 2. Logic Hook
	const logic: UseProductAdminLogicReturn = useProductAdminLogic();

	const isPageLoading: boolean = isProductsLoading;

	if (isPageLoading && (!products || products.length === 0)) {
		return <div className='p-4 text-gray-500'>Đang tải dữ liệu...</div>;
	}

	// 3. Truyền dữ liệu và hàm xử lý
	return (
		<ProductAdminUi
			products={products ?? []}
			{...logic}
		/>
	);
}
