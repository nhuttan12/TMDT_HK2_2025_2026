'use client';

import { JSX } from 'react';
import ProductList from '@/components/product-list';
import Pagination from '@/components/pagination';

export default function ProductsPageClient(): JSX.Element {
	return (
		<>
			<section className='max-w-7xl mx-auto mt-10 space-y-6'>
				<ProductList />

				<Pagination totalPages={10} />
			</section>
		</>
	);
}
