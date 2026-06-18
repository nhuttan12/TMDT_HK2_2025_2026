'use client';

import ProductUi from '@/app/(app)/products/_components/products-ui';
import { usePagination } from '@/hooks/share/use-pagination';
import { useProductListQuery } from '@/queries/products/user/use-product-list-query';
import { ProductUserCard } from '@/types/products/user/ProductUserCard';
import { PaginationResponse } from '@/types/shared/PaginationResponse';
import { JSX } from 'react';

interface ProductsContainerProps {
	initialProducts: PaginationResponse<ProductUserCard>;
}

export default function ProductsContainer({initialProducts}: ProductsContainerProps): JSX.Element {
	const pagination = usePagination();

	const { data, isLoading } = useProductListQuery(initialProducts);

    const currentData = data?.data || initialProducts.data;
    const currentMeta = data?.meta || initialProducts.meta;

	return (
		<ProductUi
			{...pagination}
			products={currentData}
            totalPages={currentMeta.totalPages}
			isLoading={isLoading}
		/>
	);
}
