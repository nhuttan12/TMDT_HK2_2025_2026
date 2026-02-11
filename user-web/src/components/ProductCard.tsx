'use client';

import { JSX } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, StarOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ProductSummaryDTO } from '@/types/product-summary.dto';

interface ProductCardProps {
	product: ProductSummaryDTO;
}

export default function ProductCard({
										product,
									}: ProductCardProps): JSX.Element {
	const router = useRouter();

	const hasDiscount = product.discount > 0;
	const newPrice = hasDiscount
		? product.price * (1 - product.discount / 100)
		: product.price;

	return (
		<Card
			onClick={() => router.push(`/products/${product.productID}`)}
			className="relative cursor-pointer hover:shadow-md transition-shadow"
		>
			{/* Wishlist button */}
			<Button
				variant="ghost"
				size="icon"
				className="absolute top-2 right-2 z-20 bg-white/80 backdrop-blur"
				onClick={(e) => {
					e.stopPropagation();
					console.log('wishlist');
				}}
			>
				{product.isInWishlist ? (
					<StarOff size={20} className="text-red-500" />
				) : (
					<Star size={20} />
				)}
			</Button>

			<CardContent className="p-0">
				<img
					src={product.imgUrl}
					alt={product.name}
					className="w-full h-[140px] object-cover rounded-t-xl"
				/>
			</CardContent>

			<CardFooter className="flex flex-col items-start gap-1">
				<div className="flex justify-between w-full items-center">
					<b className="truncate mr-2">{product.name}</b>
					<span className="flex items-center text-yellow-500 text-xs">
            ⭐ {product.rating}
          </span>
				</div>

				<div className="flex flex-col items-start">
					{hasDiscount ? (
						<>
              <span className="font-bold">
                {newPrice.toLocaleString()} đồng
              </span>
							<span className="text-muted-foreground line-through text-xs decoration-red-500">
                {product.price.toLocaleString()} đồng
              </span>
						</>
					) : (
						<p className="text-muted-foreground">
							{product.price.toLocaleString()} đồng
						</p>
					)}
				</div>
			</CardFooter>
		</Card>
	);
}
