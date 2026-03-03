'use client';

import { JSX } from 'react';
import ProductList from '@/components/product/user/product-list';
import Pagination from '@/components/layout/share/pagination';
import ProductFilter from '@/components/product/user/product-filter';

export default function ProductsPageClient(): JSX.Element {
	return (
		<>
			<section className='max-w-7xl mx-auto mt-10 space-y-6'>
				<ProductFilter />
				<ProductList />

				<Pagination totalPages={10} />
			</section>
		</>
	);
}
