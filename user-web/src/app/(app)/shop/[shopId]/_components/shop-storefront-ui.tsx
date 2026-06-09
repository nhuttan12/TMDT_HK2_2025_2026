'use client';

import React, { JSX } from 'react';
import { PaginationResponse } from '@/types/shared/PaginationResponse';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Pagination from '@/components/layout/share/pagination'; // Đường dẫn component Pagination của bạn
import { ShopStorefrontLogicReturn } from '@/hooks/shops/user/use-shop-storefront-logic';
import { ShopStorefront } from '@/types/shops/user/ShopStorefront';
import { ProductUserCard } from '@/types/products/user/ProductUserCard';
import { UserCoupon } from '@/types/marketing/coupons/user/UserCoupon';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import { CouponListUi } from '@/components/marketing/coupons/user/coupon-list-ui';

interface ShopStorefrontUiProps extends ShopStorefrontLogicReturn {
	shopInfo: ShopStorefront;
	products?: PaginationResponse<ProductUserCard>;
	coupons?: UserCoupon[];
	isProductsLoading: boolean;
	currentPage: number;
	changePage: (page: number) => void;
}

export const ShopStorefrontUi = ({
	shopInfo,
	products,
	coupons,
	isProductsLoading,
	filter,
	isFollowing,
	handleSortChange,
	handleFollowClick,
	handleClaimCoupon,
	currentPage,
	changePage,
}: ShopStorefrontUiProps): JSX.Element => {
	const safeBanners: string[] = shopInfo.banners || [];
	const safeCoupons: UserCoupon[] = coupons || [];

	return (
		<div className='min-h-screen bg-gray-50 pb-12'>
			{/* HERO BANNER */}
			<div className='bg-white shadow-sm mb-6'>
				<div
					className='h-48 md:h-64 w-full bg-cover bg-center'
					style={{ backgroundImage: `url(${shopInfo.coverUrl})` }}
				/>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='relative flex flex-col md:flex-row items-center md:items-end -mt-12 md:-mt-16 pb-6 gap-6'>
						<div className='w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white overflow-hidden bg-white shadow-md'>
							<img
								src={shopInfo.logoUrl}
								alt={shopInfo.name}
								className='w-full h-full object-cover'
							/>
						</div>

						<div className='flex-1 text-center md:text-left mb-2'>
							<h1 className='text-2xl font-bold text-gray-900'>{shopInfo.name}</h1>
							<p className='text-sm text-gray-500 mt-1 flex justify-center md:justify-start gap-4'>
								<span>⭐ {shopInfo.rating} Đánh giá</span>
								<span>👥 {shopInfo.followerCount.toLocaleString()} Theo dõi</span>
							</p>
						</div>

						<div className='flex gap-3 mb-2'>
							<Button variant='outline'>💬 Chat ngay</Button>
							<Button
								variant={isFollowing ? 'outline' : 'default'}
								onClick={handleFollowClick}
							>
								{isFollowing ? '✓ Đã theo dõi' : '+ Theo dõi'}
							</Button>
						</div>
					</div>
				</div>
			</div>

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8'>
				{/* SLIDER BANNER ZONE */}
				{safeBanners.length > 0 && (
					<section className='w-full rounded-xl overflow-hidden shadow-sm'>
						{/* opts={{ loop: true }} giúp slider có thể cuộn vòng lặp bất tận */}
						<Carousel
							opts={{ loop: true }}
							className='w-full'
						>
							<CarouselContent>
								{safeBanners.map(
									(bannerUrl: string, index: number): JSX.Element => (
										<CarouselItem key={index}>
											{/* Chiều cao Banner thay đổi linh hoạt theo kích thước màn hình để tránh bị vỡ ảnh */}
											<div className='relative w-full h-50 sm:h-75 md:h-100 bg-gray-100'>
												<img
													src={bannerUrl}
													alt={`${shopInfo.name} banner ${index + 1}`}
													className='w-full h-full object-cover'
												/>
											</div>
										</CarouselItem>
									),
								)}
							</CarouselContent>
							{/* Đưa nút Next/Prev lùi vào trong khung hình một chút */}
							<CarouselPrevious className='left-4 bg-white/70 hover:bg-white border-0' />
							<CarouselNext className='right-4 bg-white/70 hover:bg-white border-0' />
						</Carousel>
					</section>
				)}

				{/* COUPON ZONE */}
				{safeCoupons.length > 0 && (
					<CouponListUi
						coupons={safeCoupons}
						onClaimClick={handleClaimCoupon}
						label={'Mã Giảm Giá Của Shop'}
					/>
				)}

				{/* PRODUCT SECTION */}
				<section>
					<div className='bg-white p-4 rounded-xl shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4'>
						<h2 className='text-lg font-bold'>Tất Cả Sản Phẩm</h2>
						<div className='flex gap-2'>
							{(['latest', 'popular', 'price_asc', 'price_desc'] as const).map(
								(sortType) => (
									<Button
										key={sortType}
										variant={filter.sortBy === sortType ? 'default' : 'outline'}
										size='sm'
										onClick={(): void => handleSortChange(sortType)}
									>
										{sortType === 'latest'
											? 'Mới nhất'
											: sortType === 'popular'
												? 'Bán chạy'
												: sortType === 'price_asc'
													? 'Giá thấp đến cao'
													: 'Giá cao đến thấp'}
									</Button>
								),
							)}
						</div>
					</div>

					{isProductsLoading ? (
						<div className='py-20 text-center text-gray-500'>Đang tải sản phẩm...</div>
					) : (
						<>
							<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
								{products?.data.map((product: ProductUserCard) => (
									<div
										key={product.id}
										className='bg-white rounded-lg border hover:shadow-md transition duration-200 overflow-hidden flex flex-col'
									>
										<img
											src={product.image}
											alt={product.name}
											className='w-full aspect-square object-cover'
										/>
										<div className='p-3 flex flex-col flex-1'>
											<h3 className='text-sm text-gray-800 line-clamp-2 mb-2 flex-1'>
												{product.name}
											</h3>
											<div className='flex justify-between items-end'>
												<span className='text-red-600 font-bold'>
													{product.price.toLocaleString('vi-VN')} ₫
												</span>
												{product.discount > 0 && (
													<span className='text-xs text-gray-400 line-through'>
														{(
															product.price /
															(1 - product.discount / 100)
														).toLocaleString('vi-VN')}{' '}
														₫
													</span>
												)}
											</div>
										</div>
									</div>
								))}
							</div>

							{/* COMPONENT PHÂN TRANG CỦA BẠN */}
							{products && products.meta.totalPages > 1 && (
								<Pagination
									currentPage={currentPage}
									totalPages={products.meta.totalPages}
									onPageChange={changePage}
								/>
							)}
						</>
					)}
				</section>
			</div>
		</div>
	);
};
