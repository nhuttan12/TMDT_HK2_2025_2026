'use client';

import ProductUi from '@/app/(app)/products/_components/products-ui';
import ProductFilterSidebar from '@/components/products/user/product-filter-sidebar';
import { useProductFilterLogic } from '@/hooks/products/user/use-product-filter-logic';
import { usePagination } from '@/hooks/share/use-pagination';
import { useProductListQuery } from '@/queries/products/user/use-product-list-query';
import { CategoryOption } from '@/types/products/user/CategoryOption';
import { ProductUserCard } from '@/types/products/user/ProductUserCard';
import { ShopOption } from '@/types/products/user/ShopOption';
import { PaginationResponse } from '@/types/shared/PaginationResponse';
import { JSX } from 'react';

interface ProductsContainerProps {
	initialProducts: PaginationResponse<ProductUserCard>;
	shopOption: ShopOption[];
	categoryOption: CategoryOption[];
}

export default function ProductsContainer({
	initialProducts,
	shopOption,
	categoryOption,
}: ProductsContainerProps): JSX.Element {
	const pagination = usePagination();

	const { buildFilterRequest } = useProductFilterLogic();
	const currentFilter = buildFilterRequest();

	const pageRequest = {
		page: pagination.currentPage,
		limit: 12,
	};

	const { data, isLoading } = useProductListQuery(initialProducts, pageRequest, currentFilter);

	const currentData = data?.data || initialProducts.data;
	const currentMeta = data?.meta || initialProducts.meta;

	return (
		<ProductUi
			{...pagination}
			products={currentData}
			totalPages={currentMeta.totalPages}
			isLoading={isLoading}
			sidebar={
				<ProductFilterSidebar
					categories={categoryOption}
					shops={shopOption}
				/>
			}
		/>
	);
}
