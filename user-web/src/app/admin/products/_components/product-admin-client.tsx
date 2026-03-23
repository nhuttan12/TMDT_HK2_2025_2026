'use client';

import { JSX } from 'react';
import { ProductListInfoAdmin } from '@/types/products/admin/ProductListInfoAdmin';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ProductAdminSortField } from '@/types/products/admin/ProductAdminSort';
import { useTableSort } from '@/hooks/use-table-sort';
import AdminTableHeader from '@/components/layout/admin/admin-table-header';
import ProductAdminTable from '@/app/admin/products/_components/product-admin-table';
import { usePagination } from '@/hooks/use-pagination';
import Pagination from '@/components/layout/share/pagination';
import { ProductAdminFilterValues } from '@/types/products/admin/ProductAdminFilterValues';
import { FilterField } from '@/types/uis/FilterField';

interface Props {
	products: ProductListInfoAdmin[];
}

const productFilterSchema: FilterField<ProductAdminFilterValues>[] = [
	{ key: 'name', label: 'Tên sản phẩm', type: 'text', gridSpan: 1, placeholder: 'Tìm theo tên' },
	{ key: 'slug', label: 'Slug', type: 'text', gridSpan: 1, placeholder: 'Tìm theo slug' },
	{ key: 'priceMin', label: 'Giá từ', type: 'number', gridSpan: 1, placeholder: 'Ví dụ: 100000' },
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

export default function ProductAdminClient({ products }: Props): JSX.Element {
	const router: AppRouterInstance = useRouter();

	const { handleSort, renderSortIcon } = useTableSort<ProductAdminSortField>();
	const { currentPage, changePage } = usePagination();

	const handleRedirectToAddNewProduct = () => {
		router.push('/admin/products/add-new');
	};

	const handleRedirectToProductViewMode = (productID: number) => {
		router.push(`/admin/products/${productID}`);
	};

	const handleRedirectToEditProductEditMode = (userID: number) => {
		router.push(`/admin/products/update/${userID}`);
	};

	return (
		<div className='space-y-4'>
			{/* Header */}
			<AdminTableHeader<ProductAdminFilterValues>
				title='Quản lý sản phẩm'
				description='Quản lý toàn bộ sản phẩm trong hệ thống'
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
