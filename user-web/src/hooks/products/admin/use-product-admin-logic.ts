import { JSX } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';

import { useTableSort } from '@/hooks/share/use-table-sort';
import { usePagination } from '@/hooks/share/use-pagination';
import { ProductAdminSortField } from '@/types/products/admin/ProductAdminSort';
import { FilterField } from '@/types/uis/FilterField';
import { ProductAdminFilterValues } from '@/types/products/admin/ProductAdminFilterValues';
import { AppRole } from '@/types/uis/AppRole';

export interface UseProductAdminLogicReturn {
	currentPage: number;
    totalPage: number;
	changePage: (page: number) => void;
	handleSort: (field: ProductAdminSortField) => void;
	renderSortIcon: (field: ProductAdminSortField) => JSX.Element | null;
	handleRedirectToAddNewProduct: () => void;
	handleRedirectToProductViewMode: (productId: string) => void;
	handleRedirectToEditProductEditMode: (productId: string) => void;
	handleDeleteProduct: (productId: string) => void;
	productFilterSchema: FilterField<ProductAdminFilterValues>[];
}

interface UseProductAdminLogicProps {
	role: AppRole;
    totalPage: number;
	productApproval?: boolean;
}

export function useProductAdminLogic({
	role,
    totalPage,
	productApproval = false,
}: UseProductAdminLogicProps): UseProductAdminLogicReturn {
	const router = useRouter();

	const { handleSort, renderSortIcon } = useTableSort<ProductAdminSortField>();
	const { currentPage, changePage } = usePagination();

	const handleRedirectToAddNewProduct = (): void => {
		if (role == 'shop-owner') {
			router.push('/shop-owner/products/add-new');
		} else {
			router.push('/admin/product-approvals');
		}
	};

	const handleRedirectToProductViewMode = (productId: string): void => {
		if (role == 'admin' && productApproval) {
			router.push(`/admin/product-approvals/${productId}`);
		} else {
			router.push(`/admin/products/${productId}`);
		}
	};

	const handleRedirectToEditProductEditMode = (productId: string): void => {
		router.push(`/shop-owner/products/update/${productId}`);
	};

	const handleDeleteProduct = (productId: string): void => {};

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
		currentPage,
        totalPage,
		changePage,
		handleSort,
		renderSortIcon: renderSortIcon as (field: ProductAdminSortField) => JSX.Element | null,
		handleRedirectToAddNewProduct,
		handleRedirectToProductViewMode,
		handleRedirectToEditProductEditMode,
		handleDeleteProduct,
		productFilterSchema,
	};
}
