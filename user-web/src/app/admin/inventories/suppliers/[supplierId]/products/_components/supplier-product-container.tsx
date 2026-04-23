'use client';

import React, { JSX } from 'react';
import ProductAdminUi from '@/app/admin/products/_components/product-admin-ui';
import { ProductListInfoAdmin } from '@/types/products/admin/ProductListInfoAdmin';
import { useProductBySupplierQuery } from '@/queries/inventories/suppliers/use-product-by-supplier-query';
import {
	useSupplierProductLogic,
	UseSupplierProductLogicReturn,
} from '@/hooks/inventories/suppliers/use-supplier-product-logic';

interface SupplierProductContainerProps {
	supplierId: number;
	supplierName: string;
	initialProducts: ProductListInfoAdmin[];
}

export default function SupplierProductContainer({
	supplierId,
	supplierName,
	initialProducts,
}: SupplierProductContainerProps): JSX.Element {
	// 1. Data Fetching
	const { data: products = [], isLoading: isProductsLoading } = useProductBySupplierQuery(
		supplierId,
		initialProducts,
	);

	// 2. Logic Hook
	const logic: UseSupplierProductLogicReturn = useSupplierProductLogic({
		supplierId: supplierId,
	});

	const isPageLoading: boolean = isProductsLoading;

	if (isPageLoading && products.length === 0) {
		return <div className='p-4 text-gray-500'>Đang tải dữ liệu...</div>;
	}

	return (
		<ProductAdminUi
			products={products}
			{...logic}
			customTitle={`Sản phẩm của nhà cung cấp: ${supplierName}`}
			customDescription='Quản lý toàn bộ sản phẩm do nhà cung cấp này phân phối.'
		/>
	);
}
