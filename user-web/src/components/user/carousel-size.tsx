import * as React from 'react';
import { JSX } from 'react';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import ProductCard from '@/components/user/product-card';
import { ProductCard } from '@/types/products/user/ProductCard';

interface Props {
	products: ProductCard[];
}

export function CarouselSize({ products }: Props): JSX.Element {
	return (
		<Carousel
			opts={{
				align: 'start',
			}}
			className='w-full'
		>
			<CarouselContent>
				{products.map(
					(product: ProductCard): JSX.Element => (
						<CarouselItem
							key={product.productID}
							className='basis-1/2 lg:basis-1/3'
						>
							<div className='p-1'>
								<ProductCard
									key={product.productID}
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
