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
import ProductAdminUi from '@/app/admin/products/_components/product-admin-ui';

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

export default function ProductAdminContainer({ products }: Props): JSX.Element {
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
		/>
	);
}
