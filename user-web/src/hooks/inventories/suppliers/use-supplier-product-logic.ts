import { JSX, ReactNode } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { ProductAdminSortField } from '@/types/products/admin/ProductAdminSort';
import { FilterField } from '@/types/uis/FilterField';
import { ProductAdminFilterValues } from '@/types/products/admin/ProductAdminFilterValues';
import { useTableSort } from '@/hooks/share/use-table-sort';
import { usePagination } from '@/hooks/share/use-pagination';

// 1. Props Interface
export interface UseSupplierProductLogicProps {
	supplierId: number;
}

// 2. Return Interface
export interface UseSupplierProductLogicReturn {
	currentPage: number;
	changePage: (page: number) => void;
	handleSort: (field: ProductAdminSortField) => void;
	renderSortIcon: (field: ProductAdminSortField) => JSX.Element | null;
	handleRedirectToAddNewProduct: () => void;
	handleRedirectToProductViewMode: (productId: number) => void;
	handleRedirectToEditProductEditMode: (productId: number) => void;
	productFilterSchema: FilterField<ProductAdminFilterValues>[];
}

// 3. Logic Hook
export function useSupplierProductLogic(
	props: UseSupplierProductLogicProps,
): UseSupplierProductLogicReturn {
	const router: AppRouterInstance = useRouter();

	const { handleSort, renderSortIcon } = useTableSort<ProductAdminSortField>();
	const { currentPage, changePage } = usePagination();

	const handleRedirectToAddNewProduct = (): void => {
		router.push(`/admin/inventories/suppliers/${props.supplierId}/products/add-new`);
	};

	const handleRedirectToProductViewMode = (productId: number): void => {
		router.push(`/admin/products/${productId}`);
	};

	const handleRedirectToEditProductEditMode = (productId: number): void => {
		router.push(`/admin/products/update/${productId}`);
	};

	// Chuyển schema tĩnh vào đây để Container sạch sẽ hơn
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
		renderSortIcon: renderSortIcon,
		handleRedirectToAddNewProduct: handleRedirectToAddNewProduct,
		handleRedirectToProductViewMode: handleRedirectToProductViewMode,
		handleRedirectToEditProductEditMode: handleRedirectToEditProductEditMode,
		productFilterSchema: productFilterSchema,
	};
}