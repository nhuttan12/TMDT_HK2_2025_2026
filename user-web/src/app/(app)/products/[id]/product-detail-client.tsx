'use client';

import { CarouselSize } from '@/components/carousel-size';
import CommentItem from '@/components/comment-item';
import Rating from '@/components/rating';
import ReadMoreHtml from '@/components/read-more-html';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/cart.store';
import { useCheckoutStore } from '@/stores/checkout.store';
import { CartItem } from '@/types/carts/CartItem';
import { CommentModel } from '@/types/products/CommentModel';
import { ProductDetail } from '@/types/products/ProductDetail';
import { ProductSummary } from '@/types/products/ProductSummary';
import { Separator } from '@radix-ui/react-separator';
import { Minus, Plus, ShieldCheck, Truck } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { JSX } from 'react';

interface Props {
	product: ProductDetail;
	relatedProducts: ProductSummary[];
	comments: CommentModel[];
}

export default function ProductDetailClient({ product, relatedProducts, comments }: Props): JSX.Element {
	const addItem = useCartStore((state) => state.addItem);
	const setCheckoutItems = useCheckoutStore((s) => s.setItems);
	const router = useRouter();

	const handleAddToCart = () => {
		addItem({
			productID: product.productID,
			name: product.name,
			price: product.price,
			imageUrl: product.imageUrl,
			quantity: 1,
		});
	};

	const handleBuyNow = () => {
		const item: CartItem = {
			productID: product.productID,
			name: product.name,
			price: product.price,
			imageUrl: product.imageUrl,
			quantity: 1,
		};

		setCheckoutItems([item]);

		//TODO: Call API
		router.push('/checkout');
	};

	return (
		<div className='w-full px-10 py-10'>
			<div className='grid grid-cols-1 lg:grid-cols-5 gap-10'>
				{/* LEFT SIDE */}
				<div className='flex flex-col gap-10 lg:col-span-3'>
					{/* IMAGE */}
					<div className='relative w-full h-125 rounded-2xl overflow-hidden bg-muted'>
						<Image
							src={product.imageUrl}
							alt={product.name}
							fill
							className='object-cover'
							priority
						/>
					</div>

					{/* RELATED PRODUCTS */}
					<div>
						<h2 className='text-2xl font-semibold pb-6'>Sản phẩm liên quan</h2>

						<CarouselSize products={relatedProducts} />
					</div>

					{/* PRODUCT DESCRIPTION */}
					<div>
						<h1 className='font-bold text-2xl! pb-4'>
							<strong>Mô tả sản phẩm</strong>
						</h1>

						<ReadMoreHtml
							html={product.description}
							maxLines={10}
						/>
					</div>

					{/* PRODUCT RATING */}
					<div>
						<h1 className='font-bold text-2xl! pb-4'>
							<strong>Đánh giá sản phẩm</strong>
						</h1>

						<Rating rating={product.rating} />
					</div>

					{/*COMMENT*/}
					<div>
						{comments.map(
							(comment: CommentModel): JSX.Element => (
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
					{/* Brand */}
					<div className='text-sm text-muted-foreground'>
						Thương hiệu: <span className='font-medium text-black'>{product.brand}</span>
					</div>

					{/* Title */}
					<h1 className='text-3xl font-semibold leading-tight'>{product.name}</h1>

					{/* SKU */}
					<div className='text-sm text-muted-foreground'>
						Mã sản phẩm: <span className='font-medium'>{product.productID}</span>
					</div>

					{/* Price */}
					<div className='text-3xl font-bold text-red-600'>
						{product.price.toLocaleString()}đ
					</div>

					{/* Quantity */}
					<div className='flex items-center gap-4'>
						<div className='flex items-center border rounded-full overflow-hidden'>
							<Button
								variant='ghost'
								size='icon'
								className='rounded-none cursor-pointer'
							>
								<Minus size={16} />
							</Button>

							<span className='px-6 font-medium'>1</span>

							<Button
								variant='ghost'
								size='icon'
								className='rounded-none cursor-pointer'
							>
								<Plus size={16} />
							</Button>
						</div>
					</div>

					{/* Actions */}
					<div className='flex flex-col gap-4'>
						<div className='rounded-full border! border-orange-500!'>
							<Button
								variant='outline'
								onClick={handleAddToCart}
								className='w-full rounded-full border-0 text-orange-600 hover:bg-orange-500 hover:text-white cursor-pointer'
							>
								THÊM VÀO GIỎ
							</Button>
						</div>

						<Button
							onClick={handleBuyNow}
							className='rounded-full bg-orange-500 hover:bg-orange-600 cursor-pointer'
						>
							MUA NGAY
						</Button>
					</div>

					<Separator />

					{/* Policy */}
					<div className='grid gap-4 text-sm text-muted-foreground sm:grid-cols-2'>
						<div className='flex items-center gap-2'>
							<Truck size={18} />
							Giao hàng nội thành 4 giờ
						</div>

						<div className='flex items-center gap-2'>
							<Truck size={18} />
							Giao hàng toàn quốc
						</div>

						<div className='flex items-center gap-2'>
							<ShieldCheck size={18} />
							Kiểm tra khi nhận hàng
						</div>

						<div className='flex items-center gap-2'>
							<ShieldCheck size={18} />
							Đổi trả trong 48 giờ
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
