'use client';

import CommentItem from '@/components/products/user/comment-item';
import { ProductDetailCarousel } from '@/components/products/user/product-detail-carousel';
import Rating from '@/components/products/user/rating';
import ReadMoreHtml from '@/components/products/user/read-more-html';
import { Button } from '@/components/ui/button';
import { ProductDetailLogicReturn } from '@/hooks/products/user/use-product-detail-logic';
import { ProductDetail } from '@/types/products/user/ProductDetail';
import { ProductUserCard } from '@/types/products/user/ProductUserCard';
import { Separator } from '@radix-ui/react-separator';
import { Minus, Plus, ShieldCheck, Truck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { JSX } from 'react';

interface ProductDetailUiProps extends ProductDetailLogicReturn {
	product: ProductDetail;
	relatedProducts: ProductUserCard[];
}

export function ProductDetailUi({
	product,
	relatedProducts,
	quantity,
	selectedOptions,
	selectedVariant,
	displayPrice,
	displayImage,
	currentStock,
	handleOptionSelect,
	handleIncreaseQuantity,
	handleDecreaseQuantity,
	handleAddToCart,
	handleBuyNow,
	checkIsOptionDisabled,
}: ProductDetailUiProps): JSX.Element {
	const isFullySelected = !selectedOptions.includes(-1);
	const isActionDisabled = !isFullySelected || !selectedVariant?.isActive || currentStock === 0;

	// Xử lý mảng an toàn ngay từ đầu
	const safeTierVariations = product.tierVariations || [];
	const safeReviews = product.reviews || [];

	return (
		<div className='bg-white w-full px-10 py-10 mt-10 rounded-2xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.06)]'>
			<div className='grid grid-cols-1 lg:grid-cols-5 gap-10'>
				{/* LEFT SIDE */}
				<div className='flex flex-col gap-10 lg:col-span-3'>
					<div className='relative w-full h-125 rounded-2xl overflow-hidden bg-muted'>
						<Image
							src={displayImage}
							alt={product.name}
							fill
							className='object-cover'
							priority
						/>
					</div>

					<div>
						<h2 className='text-2xl font-semibold pb-6'>Sản phẩm liên quan</h2>
						<ProductDetailCarousel products={relatedProducts || []} />
					</div>

					<div>
						<h1 className='font-bold text-2xl! pb-4'>
							<strong>Mô tả sản phẩm</strong>
						</h1>
						<ReadMoreHtml
							html={product.description || ''}
							maxLines={10}
						/>
					</div>

					<div>
						<h1 className='font-bold text-2xl! pb-4'>
							<strong>Đánh giá sản phẩm</strong>
						</h1>
						<Rating rating={product.rating || 0} />
					</div>

					<div>
						{/* Đã bọc an toàn safeReviews */}
						{safeReviews.map(
							(comment): JSX.Element => (
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
					<div className='flex flex-col items-start gap-3 text-md text-muted-foreground'>
						<div>
							Cửa hàng:{' '}
							<Link
								href={`/shop/${product.shop?.id || ''}`}
								className='font-medium text-orange-600 hover:underline'
							>
								{product.shop?.shopName || 'Đang cập nhật'}
							</Link>
						</div>
					</div>

					<h3 className='text-2xl font-semibold leading-tight'>{product.name}</h3>

					<div className='text-sm text-muted-foreground'>
						Mã sản phẩm:{' '}
						<span className='font-medium'>
							{selectedVariant ? selectedVariant.sku : product.id}
						</span>
					</div>

					<div className='text-3xl font-bold text-red-600'>{displayPrice}</div>

					<Separator />

					{/* KHU VỰC CHỌN PHÂN LOẠI SẢN PHẨM */}
					<div className='flex flex-col gap-6'>
						{/* Đã bọc an toàn safeTierVariations */}
						{safeTierVariations.map(
							(tier, tierIndex): JSX.Element => (
								<div
									key={tier.name}
									className='flex flex-col gap-3'
								>
									<span className='font-medium text-sm text-gray-700'>
										{tier.name}
									</span>
									<div className='flex flex-wrap gap-3'>
										{(tier.options || []).map(
											(option, optionIndex): JSX.Element => {
												const isSelected =
													selectedOptions[tierIndex] === optionIndex;

												const isDisabled = checkIsOptionDisabled(
													tierIndex,
													optionIndex,
												);

												return (
													<Button
														key={option}
														variant={isSelected ? 'default' : 'outline'}
														disabled={isDisabled}
														onClick={() =>
															handleOptionSelect(
																tierIndex,
																optionIndex,
															)
														}
														className={`rounded-sm transition-all ${
															isDisabled
																? 'opacity-40 cursor-not-allowed border-dashed bg-slate-50 text-slate-400'
																: isSelected
																	? 'border-orange-500 bg-orange-50 text-orange-600 hover:bg-orange-100 hover:text-orange-600 cursor-pointer'
																	: 'hover:border-orange-500 hover:text-orange-500 cursor-pointer'
														}`}
													>
														{option}
													</Button>
												);
											},
										)}
									</div>
								</div>
							),
						)}
					</div>

					{/* ... Phần Số lượng và Nút mua hàng giữ nguyên như cũ ... */}
					<div className='flex items-center gap-6'>
						<div className='flex items-center border rounded-sm overflow-hidden w-fit'>
							<Button
								variant='ghost'
								size='icon'
								className='rounded-none cursor-pointer hover:bg-gray-100'
								onClick={() => handleDecreaseQuantity()}
								disabled={quantity <= 1 || !isFullySelected}
							>
								<Minus size={16} />
							</Button>

							<span className='px-6 font-medium text-center min-w-[3rem]'>
								{quantity}
							</span>

							<Button
								variant='ghost'
								size='icon'
								className='rounded-none cursor-pointer hover:bg-gray-100'
								onClick={() => handleIncreaseQuantity()}
								disabled={quantity >= currentStock || !isFullySelected}
							>
								<Plus size={16} />
							</Button>
						</div>

						<div className='text-sm text-muted-foreground'>
							{isFullySelected
								? currentStock > 0
									? `${currentStock} sản phẩm có sẵn`
									: 'Hết hàng'
								: 'Vui lòng chọn phân loại hàng'}
						</div>
					</div>

					<div className='flex flex-col gap-4 mt-4'>
						<Button
							variant='outline'
							onClick={() => handleAddToCart()}
							disabled={isActionDisabled}
							className='w-full rounded-sm border border-orange-500 text-orange-600 bg-orange-50 hover:bg-orange-100 hover:text-orange-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
						>
							THÊM VÀO GIỎ
						</Button>

						<Button
							onClick={() => handleBuyNow()}
							disabled={isActionDisabled}
							className='rounded-sm bg-orange-500 text-white hover:bg-orange-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
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
