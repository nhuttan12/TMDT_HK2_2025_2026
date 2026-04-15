import { JSX } from 'react';
import ProductCart from './product-card';
import { ProductUserCard } from '@/types/products/user/ProductUserCard';

interface ProductListProps {
	products: ProductUserCard[];
}

export default function ProductList({ products }: ProductListProps): JSX.Element {
	return (
		<section className='mt-3'>
			<div className='max-w-7xl mx-auto px-4'>
				<div className='bg-white rounded-2xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-6'>
					<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6'>
						{products.map((item: ProductUserCard): JSX.Element => (
							<ProductCart
								product={item}
								key={item.id}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
