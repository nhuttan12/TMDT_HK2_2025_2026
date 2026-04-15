'use client';

import { JSX } from 'react';
import { usePagination, UsePaginationReturn } from '@/hooks/share/use-pagination';
import ProductUi from '@/app/(app)/products/_components/products-ui';
import { ProductUserCard } from '@/types/products/user/ProductUserCard';
import { useProductsHomeQuery } from '@/queries/products/user/use-product-query';

interface ProductsContainerProps {
	initialProducts: ProductUserCard[];
}

export default function ProductsContainer({initialProducts}: ProductsContainerProps): JSX.Element {
	const pagination: UsePaginationReturn = usePagination();

	const { data: products = [], isLoading } = useProductsHomeQuery(initialProducts);

	return (
		<ProductUi
			{...pagination}
			products={products}
			isLoading={isLoading}
		/>
	);
}
