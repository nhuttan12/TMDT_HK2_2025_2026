'use client';

import { JSX } from 'react';
import AdminTableHeader from '@/components/layout/admin/admin-table-header';
import { ProductAdminFilterValues } from '@/types/products/admin/ProductAdminFilterValues';
import ProductAdminTable from '@/app/admin/products/_components/product-admin-table';
import Pagination from '@/components/layout/share/pagination';
import { ProductListInfoAdmin } from '@/types/products/admin/ProductListInfoAdmin';
import { ProductAdminSortField } from '@/types/products/admin/ProductAdminSort';
import { FilterField } from '@/types/uis/FilterField';
import { UseProductAdminLogicReturn } from '@/hooks/products/admin/use-product-admin-logic';

interface ProductAdminUiProps extends UseProductAdminLogicReturn {
	products: ProductListInfoAdmin[];
	customTitle?: string;
	customDescription?: string;
}

export default function ProductAdminUi({
	// Props riêng
	products,
	customTitle,
	customDescription,

	// Props được kế thừa từ hook (destructuring chuẩn xác tên gốc)
	currentPage,
	changePage,
	handleSort,
	renderSortIcon,
	handleRedirectToAddNewProduct,
	handleRedirectToProductViewMode,
	handleRedirectToEditProductEditMode,
	productFilterSchema,
}: ProductAdminUiProps): JSX.Element {
	return (
		<div className='space-y-4'>
			{/* Header */}
			<AdminTableHeader<ProductAdminFilterValues>
				title={customTitle || 'Quản lý sản phẩm'}
				description={customDescription || 'Quản lý toàn bộ sản phẩm trong hệ thống'}
				searchPlaceholder='Tìm sản phẩm...'
				searchKey='name'
				addLabel='+ Thêm sản phẩm'
				onAdd={handleRedirectToAddNewProduct}
				filter={true}
				filterField={productFilterSchema}
			/>

			{/* Table */}
			<div className='rounded-xl border bg-white'>
				<ProductAdminTable
					products={products}
					handleSort={handleSort}
					renderSortIcon={renderSortIcon}
					onView={handleRedirectToProductViewMode}
					onEdit={handleRedirectToEditProductEditMode}
				/>
			</div>

			<Pagination
				currentPage={currentPage}
				totalPages={10}
				onPageChange={changePage}
			/>
		</div>
	);
}
