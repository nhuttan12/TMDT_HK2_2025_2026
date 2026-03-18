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

interface Props {
	categories: CategoryListItemAdmin[];
}

export default function CategoryAdminClient({ categories }: Props): JSX.Element {
	const router: AppRouterInstance = useRouter();

	const { handleSort, renderSortIcon } = useTableSort<CategoryAdminSortField>();
	const { currentPage, changePage } = usePagination();

	const handleRedirectToAddNewProduct = () => {
		router.push('/admin/categories/add-new');
	};

	const handleRedirectToCategoryViewMode = (categoryID: number) => {
		router.push(`/admin/categories/${categoryID}`);
	};

	const handleRedirectToEditCategoryEditMode = (categoryID: number) => {
		router.push(`/admin/categories/update/${categoryID}`);
	};

	return (
		<div className='space-y-4'>
			{/* Header */}
			<AdminTableHeader
				title='Quản lý danh mục'
				description='Quản lý toàn bộ danh mục sản phẩm trong hệ thống'
				searchPlaceholder='Tìm danh mục...'
				addLabel='+ Thêm danh mục'
				onAdd={handleRedirectToAddNewProduct}
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
