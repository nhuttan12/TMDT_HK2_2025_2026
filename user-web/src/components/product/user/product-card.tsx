'use client';

import { JSX, useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ProductUserCard } from '@/types/products/user/ProductUserCard';

interface ProductCardProps {
	product: ProductUserCard;
	elementWidth?: number;
}

export default function ProductCard({ product, elementWidth }: ProductCardProps): JSX.Element {
	const router = useRouter();

	const [isWishlisted, setIsWishlisted] = useState(product.isInWishlist);

	const hasDiscount: boolean = product.discount > 0;
	const newPrice: number = hasDiscount
		? product.price * (1 - product.discount / 100)
		: product.price;

	return (
		<Card
			onClick={() => router.push(`/products/${product.productID}`)}
			className='relative cursor-pointer hover:shadow-md transition-shadow shrink-0'
			style={{ width: elementWidth ? `${elementWidth}px` : undefined }}
		>
			{/* Wishlist button */}
			<Button
				variant='ghost'
				size='icon'
				className='absolute top-2 right-2 z-20 bg-white/80 backdrop-blur'
				onClick={async (e) => {
					e.stopPropagation();
					setIsWishlisted((prev) => !prev);

					try {
						// await toggleWishlistAPI(product.productID);
					} catch (err) {
						setIsWishlisted((prev) => !prev); // rollback nếu lỗi
					}
				}}
			>
				{isWishlisted ? (
					<Star
						size={20}
						fill='#dfe519'
						stroke='#dfe519'
					/>
				) : (
					<Star size={20} />
				)}
			</Button>

			<CardContent className='p-0'>
				<img
					src={product.image}
					alt={product.name}
					className='w-full h-35 object-cover rounded-t-xl'
				/>
			</CardContent>

			<CardFooter className='flex flex-col items-start gap-1'>
				<div className='flex justify-between w-full items-center'>
					<b className='line-clamp-2 mr-2'>{product.name}</b>
					<span className='flex items-center text-xs font-medium'>
						<Star
							size={14}
							fill='#dfe519'
							stroke='#dfe519'
							className='mr-1'
						/>{' '}
						{product.rating}
					</span>
				</div>

				<div className='flex flex-col items-start'>
					{hasDiscount ? (
						<>
							<span className='font-bold'>{newPrice.toLocaleString()} đồng</span>
							<span className='text-muted-foreground line-through text-xs decoration-red-500'>
								{product.price.toLocaleString()} đồng
							</span>
						</>
					) : (
						<p className='text-muted-foreground'>
							{product.price.toLocaleString()} đồng
						</p>
					)}
				</div>
			</CardFooter>
		</Card>
	);
}
