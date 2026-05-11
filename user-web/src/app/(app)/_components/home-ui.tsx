import { JSX } from 'react';
import { HomeBanner } from '@/types/uis/HomeBanner';
import { ProductUserCard } from '@/types/products/user/ProductUserCard';
import { HomeBannerLogicReturn } from '@/hooks/contents/home-banners/user/use-home-logic';
import HomeBannerCarouselUi from '@/app/(app)/_components/home-banner-carousel-ui';
import ProductList from '@/components/products/user/product-list';

interface HomeUiProps extends HomeBannerLogicReturn {
	banners: HomeBanner[];
	products: ProductUserCard[];
	isLoadingBanners: boolean;
	isLoadingProducts: boolean;
}

export function HomeUi({
	banners,
	products,
	isLoadingBanners,
	isLoadingProducts,
	handleRedirectToProducts,
}: HomeUiProps): JSX.Element {
	return (
		<>
			{/* HERO BANNER SECTION */}
			<div className='w-full mt-10 rounded-2xl drop-shadow-lg min-h-[400px] bg-slate-50 flex items-center justify-center'>
				{isLoadingBanners ? (
					<span className='text-slate-400'>Đang tải Banner...</span>
				) : (
					<HomeBannerCarouselUi banners={banners} />
				)}
			</div>

			{/* PRODUCT SECTION */}
			<section className='max-w-7xl mx-auto mt-10 space-y-6'>
				<div className='flex items-center justify-between px-4 lg:px-0'>
					<h3 className='text-2xl md:text-3xl font-bold text-gray-900'>Gợi ý cho bạn</h3>

					<button
						onClick={() => handleRedirectToProducts()}
						className='text-sm font-medium text-orange-600 hover:text-orange-700 hover:underline transition cursor-pointer'
					>
						<h2>Xem tất cả →</h2>
					</button>
				</div>

				<div>
					{isLoadingProducts ? (
						<div className='py-20 text-center text-slate-500'>
							Đang tải danh sách sản phẩm...
						</div>
					) : (
						<ProductList products={products} />
					)}
				</div>
			</section>
		</>
	);
}
