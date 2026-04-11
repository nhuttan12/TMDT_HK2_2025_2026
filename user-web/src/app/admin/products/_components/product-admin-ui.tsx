'use client';

import { JSX } from 'react';
import AdminTableHeader from '@/components/layout/admin/admin-table-header';
import { ProductAdminFilterValues } from '@/types/products/admin/ProductAdminFilterValues';
import ProductAdminTable from '@/app/admin/products/_components/product-admin-table';
import Pagination from '@/components/layout/share/pagination';
import { ProductListInfoAdmin } from '@/types/products/admin/ProductListInfoAdmin';
import { ProductAdminSortField } from '@/types/products/admin/ProductAdminSort';
import { FilterField } from '@/types/uis/FilterField';

interface Props {
	products: ProductListInfoAdmin[];

	currentPage: number;
	onPageChange: (page: number) => void;

	onSort: (field: ProductAdminSortField) => void;
	renderSortIcon: (field: ProductAdminSortField) => JSX.Element | null;

	onCreate: () => void;
	onView: (id: number) => void;
	onEdit: (id: number) => void;

	filterSchema: FilterField<ProductAdminFilterValues>[];

	customTitle?: string;
	customDescription?: string;
}

export default function ProductAdminUi({
	products,
	currentPage,
	onPageChange,
	onSort,
	renderSortIcon,
	onCreate,
	onView,
	onEdit,
	filterSchema,
	customTitle,
	customDescription,
}: Props): JSX.Element {
	return (
		<div className='space-y-4'>
			{/* Header */}
			<AdminTableHeader<ProductAdminFilterValues>
				title={customTitle || 'Quản lý sản phẩm'}
				description={customDescription || 'Quản lý toàn bộ sản phẩm trong hệ thống'}
				searchPlaceholder='Tìm sản phẩm...'
				searchKey='name'
				addLabel='+ Thêm sản phẩm'
				onAdd={onCreate}
				filter
				filterField={filterSchema}
			/>

			{/* Table */}
			<div className='rounded-xl border bg-white'>
				<ProductAdminTable
					products={products}
					handleSort={onSort}
					renderSortIcon={renderSortIcon}
					onView={onView}
					onEdit={onEdit}
				/>
			</div>

			<Pagination
				currentPage={currentPage}
				totalPages={10}
				onPageChange={onPageChange}
			/>
		</div>
	);
}
