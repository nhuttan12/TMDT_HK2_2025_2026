'use client';

import { JSX } from 'react';
import { CategoryListItemAdmin } from '@/types/categories/admin/CategoryListItemAdmin';
import { useRouter } from 'next/navigation';
import { CategoryAdminSortField } from '@/types/categories/admin/CategoryAdminSort';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useTableSort } from '@/hooks/use-table-sort';
import AdminTableHeader from '@/components/layout/admin/admin-table-header';
import CategoryAdminTable from '@/app/admin/categories/_components/category-admin-table';
import { usePagination } from '@/hooks/use-pagination';
import Pagination from '@/components/layout/share/pagination';
import { FilterField } from '@/types/uis/FilterField';
import { CategoryAdminFilterValues } from '@/types/categories/admin/CategoryAdminFilterValues';

interface Props {
	categories: CategoryListItemAdmin[];
}

const categoryFilterSchema: FilterField<CategoryAdminFilterValues>[] = [
	{
		key: 'name',
		label: 'Tên danh mục',
		type: 'text',
		gridSpan: 1,
		placeholder: 'Tìm theo tên danh mục',
	},
	{
		key: 'slug',
		label: 'Slug',
		type: 'text',
		gridSpan: 2,
		placeholder: 'Tìm theo slug',
	},
	{
		key: 'productCountMin',
		label: 'Số sản phẩm từ',
		type: 'number',
		gridSpan: 1,
	},
	{
		key: 'productCountMax',
		label: 'Số sản phẩm đến',
		type: 'number',
		gridSpan: 1,
	},
	{
		key: 'status',
		label: 'Trạng thái',
		type: 'select',
		gridSpan: 2,
		options: [
			{ label: 'Tất cả', value: 'ALL' },
			{ label: 'Hoạt động', value: 'true' },
			{ label: 'Không hoạt động', value: 'false' },
		],
	},
	{
		key: 'createdFrom',
		label: 'Từ ngày tạo',
		type: 'date',
		gridSpan: 1,
	},
	{
		key: 'createdTo',
		label: 'Đến ngày tạo',
		type: 'date',
		gridSpan: 1,
	},
	{
		key: 'updatedFrom',
		label: 'Từ ngày cập nhật',
		type: 'date',
		gridSpan: 1,
	},
	{
		key: 'updatedTo',
		label: 'Đến ngày cập nhật',
		type: 'date',
		gridSpan: 1,
	},
];

export default function CategoryAdminClient({ categories }: Props): JSX.Element {
	const router: AppRouterInstance = useRouter();

	const { handleSort, renderSortIcon } = useTableSort<CategoryAdminSortField>();
	const { currentPage, changePage } = usePagination();

	const handleRedirectToAddNewProduct = () => {
		router.push('/admin/categories/add-new');
	};

	const handleRedirectToCategoryViewMode = (categoryId: number) => {
		router.push(`/admin/categories/${categoryId}`);
	};

	const handleRedirectToEditCategoryEditMode = (categoryId: number) => {
		router.push(`/admin/categories/update/${categoryId}`);
	};

	return (
		<div className='space-y-4'>
			{/* Header */}
			<AdminTableHeader<CategoryAdminFilterValues>
				title='Quản lý danh mục'
				description='Quản lý toàn bộ danh mục sản phẩm trong hệ thống'
				searchPlaceholder='Tìm danh mục...'
				searchKey='name'
				addLabel='+ Thêm danh mục'
				onAdd={handleRedirectToAddNewProduct}
				filter
				filterField={categoryFilterSchema}
			/>

			{/* Table */}
			<div className='rounded-xl border bg-white'>
				<CategoryAdminTable
					categories={categories}
					handleSort={handleSort}
					renderSortIcon={renderSortIcon}
					onView={handleRedirectToCategoryViewMode}
					onEdit={handleRedirectToEditCategoryEditMode}
				/>
			</div>

			{/* Pagination */}
			<Pagination
				currentPage={currentPage}
				totalPages={10}
				onPageChange={changePage}
			/>
		</div>
	);
}
