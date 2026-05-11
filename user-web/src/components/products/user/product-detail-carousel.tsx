import * as React from 'react';
import { JSX } from 'react';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import { ProductUserCard } from '@/types/products/user/ProductUserCard';
import ProductCard from './product-card';

interface Props {
	products: ProductUserCard[];
}

export function ProductDetailCarousel({ products }: Props): JSX.Element {
	return (
		<Carousel
			opts={{
				align: 'start',
			}}
			className='w-full'
		>
			<CarouselContent>
				{products.map(
					(product: ProductUserCard): JSX.Element => (
						<CarouselItem
							key={product.id}
							className='basis-1/2 lg:basis-1/3'
						>
							<div className='p-1'>
								<ProductCard
									key={product.id}
									product={product}
									elementWidth={185}
								/>
							</div>
						</CarouselItem>
					),
				)}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
