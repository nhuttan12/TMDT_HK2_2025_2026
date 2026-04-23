import { ProductInStock } from '@/types/inventories/stocks/ProductInStock';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { ProductInStockSortField } from '@/types/inventories/stocks/ProductInStockSortField';
import { useTableSort } from '@/hooks/share/use-table-sort';
import { usePagination } from '@/hooks/share/use-pagination';
import { ReactNode } from 'react';

export interface UseGoodsStockLogicReturn {
	handleEditVariant: (row: ProductInStock) => void;
	handleViewVariant: (row: ProductInStock) => void;
	handleSort: (field: ProductInStockSortField) => void;
	renderSortIcon: (field: ProductInStockSortField) => ReactNode;
	currentPage: number;
	changePage: (page: number) => void;
}

export function useGoodsStockLogic(): UseGoodsStockLogicReturn {
	const router: AppRouterInstance = useRouter();

	const { handleSort, renderSortIcon } = useTableSort<ProductInStockSortField>();
	const { currentPage, changePage } = usePagination();

	// Hàm xử lý chuyển hướng sang trang chỉnh sửa
	const handleEditVariant = (row: ProductInStock): void => {
		router.push(`/admin/products/${row.productId}/variant/edit/${row.productVariantId}`);
	};

	// Hàm xử lý chuyển hướng sang trang chi tiết
	const handleViewVariant = (row: ProductInStock): void => {
		router.push(`/admin/products/${row.productId}/variant/${row.productVariantId}`);
	};

	// 3. Trả về object tuân thủ interface UseProductInStockLogicReturn
	return {
		handleEditVariant: handleEditVariant,
		handleViewVariant: handleViewVariant,
		handleSort: handleSort,
		renderSortIcon: renderSortIcon,
		currentPage: currentPage,
		changePage: changePage,
	};
}