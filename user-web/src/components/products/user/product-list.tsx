import { JSX } from 'react';
import ProductCart from './product-card';
import { ProductUserCard } from '@/types/products/user/ProductUserCard';

interface ProductListProps {
	products: ProductUserCard[];
}

export default function ProductList({ products = [] }: ProductListProps): JSX.Element {
	if (products.length === 0) {
		return (
			<div className='text-center py-10 text-muted-foreground bg-white rounded-2xl border border-gray-100 shadow-sm mt-3'>
				Không tìm thấy sản phẩm nào.
			</div>
		);
	}

	return (
		<section>
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
