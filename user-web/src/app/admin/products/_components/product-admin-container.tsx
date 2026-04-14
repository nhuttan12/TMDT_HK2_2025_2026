'use client';

import { JSX } from 'react';
import { ProductListInfoAdmin } from '@/types/products/admin/ProductListInfoAdmin';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ProductAdminSortField } from '@/types/products/admin/ProductAdminSort';
import { useTableSort } from '@/hooks/share/use-table-sort';
import { usePagination } from '@/hooks/share/use-pagination';
import { ProductAdminFilterValues } from '@/types/products/admin/ProductAdminFilterValues';
import { FilterField } from '@/types/uis/FilterField';
import ProductAdminUi from '@/app/admin/products/_components/product-admin-ui';
import { useProductInStockQuery } from '@/queries/stocks/use-product-in-stock-query';
import { useProductListInfoAdmin } from '@/hooks/products/admin/use-product-list-info-admin';

interface Props {
	initialProducts: ProductListInfoAdmin[];
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

export default function ProductAdminContainer({ initialProducts }: Props): JSX.Element {
	const { data: products, isLoading: isProductsLoading } =
		useProductListInfoAdmin(initialProducts);

	const router: AppRouterInstance = useRouter();

	const { handleSort, renderSortIcon } = useTableSort<ProductAdminSortField>();
	const { currentPage, changePage } = usePagination();

	const isPageLoading: boolean = isProductsLoading;

	if (isPageLoading && !products) {
		return <div className='p-4 text-gray-500'>Đang tải dữ liệu...</div>;
	}

	const handleRedirectToAddNewProduct = () => {
		router.push('/admin/products/add-new');
	};

	const handleRedirectToProductViewMode = (productId: number) => {
		router.push(`/admin/products/${productId}`);
	};

	const handleRedirectToEditProductEditMode = (productId: number) => {
		router.push(`/admin/products/update/${productId}`);
	};

	return (
		<ProductAdminUi
			products={initialProducts}
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
