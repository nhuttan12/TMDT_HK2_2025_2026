'use client';

import AdminTableHeader from '@/components/layout/admin/admin-table-header';
import Pagination from '@/components/layout/share/pagination';
import { UseProductAdminLogicReturn } from '@/hooks/products/admin/use-product-admin-logic';
import { ProductAdminFilterValues } from '@/types/products/admin/ProductAdminFilterValues';
import { ProductListInfoAdmin } from '@/types/products/admin/ProductListInfoAdmin';
import { JSX } from 'react';
import ProductAdminTable from './product-admin-table';

interface ProductAdminUiProps extends UseProductAdminLogicReturn {
	products: ProductListInfoAdmin[];
	productApproval?: boolean;
	addLabel?: string;
	customTitle?: string;
	customDescription?: string;
}

export default function ProductAdminUi({
	// Props riêng
	products,
	productApproval,
	customTitle,
	customDescription,
	addLabel,

	// Props được kế thừa từ hook (destructuring chuẩn xác tên gốc)
    totalPage,
	currentPage,
	changePage,
	handleSort,
	renderSortIcon,
	handleRedirectToAddNewProduct,
	handleRedirectToProductViewMode,
	handleRedirectToEditProductEditMode,
	handleDeleteProduct,
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
				addLabel={addLabel}
				onAdd={handleRedirectToAddNewProduct}
				filter={true}
				filterField={productFilterSchema}
			/>

			{/* Table */}
			<div className='rounded-xl border bg-white'>
				<ProductAdminTable
					products={products}
					productApproval={productApproval}
					handleSort={handleSort}
					renderSortIcon={renderSortIcon}
					onView={handleRedirectToProductViewMode}
					onEdit={handleRedirectToEditProductEditMode}
					onDelete={handleDeleteProduct}
				/>
			</div>

			<Pagination
				currentPage={currentPage}
				totalPages={totalPage}
				onPageChange={changePage}
			/>
		</div>
	);
}
