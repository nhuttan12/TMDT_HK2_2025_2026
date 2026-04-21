'use client';

import React, { JSX } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { useTableSort } from '@/hooks/share/use-table-sort';
import { ProductAdminSortField } from '@/types/products/admin/ProductAdminSort';
import { usePagination } from '@/hooks/share/use-pagination';
import ProductAdminUi from '@/app/admin/products/_components/product-admin-ui';
import { ProductListInfoAdmin } from '@/types/products/admin/ProductListInfoAdmin';
import { FilterField } from '@/types/uis/FilterField';
import { ProductAdminFilterValues } from '@/types/products/admin/ProductAdminFilterValues';
import { useProductBySupplierData } from '@/hooks/inventories/suppliers/use-product--by-supplier-data';

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
	const router: AppRouterInstance = useRouter();

	const { data: products = [], isLoading: isProductsLoading } = useProductBySupplierData(
		supplierId,
		initialProducts,
	);

	const { handleSort, renderSortIcon } = useTableSort<ProductAdminSortField>();
	const { currentPage, changePage } = usePagination();

	const isPageLoading: boolean = isProductsLoading;

	if (isPageLoading && !products) {
		return <div className='p-4 text-gray-500'>Đang tải dữ liệu...</div>;
	}

	const handleRedirectToAddNewProduct = () => {
		router.push(`/admin/inventories/suppliers/${supplierId}/products/add-new`);
	};

	const handleRedirectToProductViewMode = (productId: number): void => {
		router.push(`/admin/products/${productId}`);
	};

	const handleRedirectToEditProductEditMode = (productId: number): void => {
		router.push(`/admin/products/update/${productId}`);
	};

	const productFilterSchema: FilterField<ProductAdminFilterValues>[] = [
		{
			key: 'name',
			label: 'Tên sản phẩm',
			type: 'text',
			gridSpan: 1,
			placeholder: 'Tìm theo tên',
		},
		{ key: 'slug', label: 'Slug', type: 'text', gridSpan: 1, placeholder: 'Tìm theo slug' },
		{
			key: 'priceMin',
			label: 'Giá từ',
			type: 'number',
			gridSpan: 1,
			placeholder: 'Ví dụ: 100000',
		},
		{
			key: 'priceMax',
			label: 'Giá đến',
			type: 'number',
			gridSpan: 1,
			placeholder: 'Ví dụ: 500000',
		},
		{
			key: 'status',
			label: 'Trạng thái',
			type: 'select',
			gridSpan: 2,
			options: [
				{ label: 'Hoạt động', value: 'true' },
				{ label: 'Không hoạt động', value: 'false' },
			],
		},
		{ key: 'createdFrom', label: 'Từ ngày thêm', type: 'date', gridSpan: 1 },
		{ key: 'createdTo', label: 'Đến ngày thêm', type: 'date', gridSpan: 1 },
		{ key: 'updatedFrom', label: 'Từ ngày chỉnh sửa', type: 'date', gridSpan: 1 },
		{ key: 'updatedTo', label: 'Đến ngày chỉnh sửa', type: 'date', gridSpan: 1 },
	];

	return (
		<ProductAdminUi
			products={products}
			currentPage={currentPage}
			onPageChange={changePage}
			onSort={handleSort}
			renderSortIcon={renderSortIcon}
			onCreate={handleRedirectToAddNewProduct}
			onView={handleRedirectToProductViewMode}
			onEdit={handleRedirectToEditProductEditMode}
			filterSchema={productFilterSchema}
			customTitle={`Sản phẩm của nhà cung cấp: ${supplierName}`}
			customDescription='Quản lý toàn bộ sản phẩm do nhà cung cấp này phân phối.'
		/>
	);
}
