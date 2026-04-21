'use client';

import { JSX } from 'react';
import Image from 'next/image';
import { Minus, Plus, ShieldCheck, Truck } from 'lucide-react';
import { Separator } from '@radix-ui/react-separator';
import { ProductDetailCarousel } from '@/components/product/user/product-detail-carousel';
import CommentItem from '@/components/product/user/comment-item';
import Rating from '@/components/product/user/rating';
import ReadMoreHtml from '@/components/product/user/read-more-html';
import { Button } from '@/components/ui/button';
import { Review } from '@/types/products/user/Review';
import { ProductDetail } from '@/types/products/user/ProductDetail';
import { ProductUserCard } from '@/types/products/user/ProductUserCard';
import { ProductDetailLogicReturn } from '@/hooks/products/user/use-product-detail-logic';

interface ProductDetailUiProps extends ProductDetailLogicReturn {
	product: ProductDetail;
	relatedProducts: ProductUserCard[];
}

export function ProductDetailUi({
	product,
	relatedProducts,
	quantity,
	handleIncreaseQuantity,
	handleDecreaseQuantity,
	handleAddToCart,
	handleBuyNow,
}: ProductDetailUiProps): JSX.Element {
	return (
		<div className='bg-white w-full px-10 py-10 mt-10 rounded-2xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.06)]'>
			<div className='grid grid-cols-1 lg:grid-cols-5 gap-10'>
				{/* LEFT SIDE */}
				<div className='flex flex-col gap-10 lg:col-span-3'>
					<div className='relative w-full h-125 rounded-2xl overflow-hidden bg-muted'>
						<Image
							src={product.image}
							alt={product.name}
							fill
							className='object-cover'
							priority
						/>
					</div>

					<div>
						<h2 className='text-2xl font-semibold pb-6'>Sản phẩm liên quan</h2>
						<ProductDetailCarousel products={relatedProducts} />
					</div>

					<div>
						<h1 className='font-bold text-2xl! pb-4'>
							<strong>Mô tả sản phẩm</strong>
						</h1>
						<ReadMoreHtml
							html={product.description}
							maxLines={10}
						/>
					</div>

					<div>
						<h1 className='font-bold text-2xl! pb-4'>
							<strong>Đánh giá sản phẩm</strong>
						</h1>
						<Rating rating={product.rating} />
					</div>

					<div>
						{product.reviews.map(
							(comment: Review): JSX.Element => (
								<CommentItem
									comment={comment}
									key={comment.id}
								/>
							),
						)}
					</div>
				</div>

				{/* RIGHT - INFO */}
				<div className='flex flex-col space-y-6 lg:col-span-2'>
					<div className='text-md text-muted-foreground'>
						Thương hiệu: <span className='font-medium text-black'>{product.brand}</span>
					</div>

					<h3 className='text-2xl font-semibold leading-tight'>{product.name}</h3>

					<div className='text-sm text-muted-foreground'>
						Mã sản phẩm: <span className='font-medium'>{product.id}</span>
					</div>

					<div className='text-3xl font-bold text-red-600'>
						{product.price.toLocaleString()}đ
					</div>

					<div className='flex items-center gap-4'>
						<div className='flex items-center border rounded-full overflow-hidden'>
							<Button
								variant='ghost'
								size='icon'
								className='rounded-none cursor-pointer'
								onClick={() => handleDecreaseQuantity()}
							>
								<Minus size={16} />
							</Button>

							<span className='px-6 font-medium'>{quantity}</span>

							<Button
								variant='ghost'
								size='icon'
								className='rounded-none cursor-pointer'
								onClick={() => handleIncreaseQuantity()}
							>
								<Plus size={16} />
							</Button>
						</div>
					</div>

					<div className='flex flex-col gap-4'>
						<div className='rounded-full border! border-orange-500!'>
							<Button
								variant='outline'
								onClick={() => handleAddToCart()}
								className='w-full rounded-full border-0 text-orange-600 hover:bg-orange-500 hover:text-white cursor-pointer'
							>
								THÊM VÀO GIỎ
							</Button>
						</div>

						<Button
							onClick={() => handleBuyNow()}
							className='rounded-full bg-orange-500 hover:bg-orange-600 cursor-pointer'
						>
							MUA NGAY
						</Button>
					</div>

					<Separator />

					<div className='grid gap-4 text-sm text-muted-foreground sm:grid-cols-2'>
						<div className='flex items-center gap-2'>
							<Truck size={18} /> Giao hàng nội thành 4 giờ
						</div>
						<div className='flex items-center gap-2'>
							<Truck size={18} /> Giao hàng toàn quốc
						</div>
						<div className='flex items-center gap-2'>
							<ShieldCheck size={18} /> Kiểm tra khi nhận hàng
						</div>
						<div className='flex items-center gap-2'>
							<ShieldCheck size={18} /> Đổi trả trong 48 giờ
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
