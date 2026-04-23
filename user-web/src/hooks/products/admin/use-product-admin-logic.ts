import { JSX } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';

import { useTableSort } from '@/hooks/share/use-table-sort';
import { usePagination } from '@/hooks/share/use-pagination';
import { ProductAdminSortField } from '@/types/products/admin/ProductAdminSort';
import { FilterField } from '@/types/uis/FilterField';
import { ProductAdminFilterValues } from '@/types/products/admin/ProductAdminFilterValues';

export interface UseProductAdminLogicReturn {
	currentPage: number;
	changePage: (page: number) => void;
	handleSort: (field: ProductAdminSortField) => void;
	renderSortIcon: (field: ProductAdminSortField) => JSX.Element | null;
	handleRedirectToAddNewProduct: () => void;
	handleRedirectToProductViewMode: (productId: number) => void;
	handleRedirectToEditProductEditMode: (productId: number) => void;
	productFilterSchema: FilterField<ProductAdminFilterValues>[];
}

export function useProductAdminLogic(): UseProductAdminLogicReturn {
	const router: AppRouterInstance = useRouter();

	const { handleSort, renderSortIcon } = useTableSort<ProductAdminSortField>();
	const { currentPage, changePage } = usePagination();

	const handleRedirectToAddNewProduct = (): void => {
		router.push('/admin/products/add-new');
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

	return {
		currentPage: currentPage,
		changePage: changePage,
		handleSort: handleSort,
		renderSortIcon: renderSortIcon as (field: ProductAdminSortField) => JSX.Element | null,
		handleRedirectToAddNewProduct: handleRedirectToAddNewProduct,
		handleRedirectToProductViewMode: handleRedirectToProductViewMode,
		handleRedirectToEditProductEditMode: handleRedirectToEditProductEditMode,
		productFilterSchema: productFilterSchema,
	};
}
