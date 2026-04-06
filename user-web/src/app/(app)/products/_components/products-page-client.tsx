'use client';

import { JSX } from 'react';
import ProductList from '@/components/product/user/product-list';
import Pagination from '@/components/layout/share/pagination';
import ProductFilter from '@/components/product/user/product-filter';
import { usePagination } from '@/hooks/share/use-pagination';

export default function ProductsPageClient(): JSX.Element {
	const { currentPage, changePage } = usePagination();

	return (
		<>
			<section className='max-w-7xl mx-auto mt-10 space-y-6'>
				<ProductFilter />
				<ProductList />

				<Pagination
					currentPage={currentPage}
					totalPages={10}
					onPageChange={changePage}
				/>
			</section>
		</>
	);
}
