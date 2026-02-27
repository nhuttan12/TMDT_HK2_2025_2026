'use client';

import { JSX } from 'react';
import ProductList from '@/components/user/product-list';
import Pagination from '@/components/user/pagination';
import FilterModal from '@/components/user/filter-modal';

export default function ProductsPageClient(): JSX.Element {
	return (
		<>
			<section className='max-w-7xl mx-auto mt-10 space-y-6'>
				<FilterModal />
				<ProductList />

				<Pagination totalPages={10} />
			</section>
		</>
	);
}
