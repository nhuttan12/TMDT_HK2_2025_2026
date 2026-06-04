import { JSX } from 'react';
import { ProductUserCard } from '@/types/products/user/ProductUserCard';
import { HomeBannerLogicReturn } from '@/hooks/contents/home-banners/user/use-home-logic';
import HomeBannerCarouselUi from '@/app/(app)/_components/home-banner-carousel-ui';
import ProductList from '@/components/products/user/product-list';
import { Spinner } from '@/components/ui/spinner';
import CategoryListUi from '@/components/categories/user/category-list-ui';
import { CategoryItem } from '@/types/categories/user/CategoryItem';
import { Flame } from 'lucide-react';
import { CouponListUi } from '@/components/marketing/coupons/user/coupon-list-ui';
import { UserCoupon } from '@/types/marketing/coupons/user/UserCoupon';
import { HomeBanner } from '@/types/contents/banners/HomeBanner';

interface HomeUiProps extends HomeBannerLogicReturn {
	banners: HomeBanner[];
	products: ProductUserCard[];
	categories: CategoryItem[];
	coupons: UserCoupon[];
	topSellingProducts: ProductUserCard[];
	isLoadingBanners: boolean;
	isLoadingProducts: boolean;
	isLoadingCategories: boolean;
	isLoadingTopSelling: boolean;
	isLoadingCoupons: boolean;
	handleClaimCoupon: (code: string) => void;
}

export function HomeUi({
	banners,
	products,
	categories,
	topSellingProducts,
	coupons,
	isLoadingBanners,
	isLoadingProducts,
	isLoadingCategories,
	isLoadingTopSelling,
	isLoadingCoupons,
	handleRedirectToProducts,
	handleClaimCoupon,
}: HomeUiProps): JSX.Element {
	return (
		<>
			{/* HERO BANNER SECTION */}
			<div className='w-full mt-5 rounded-2xl drop-shadow-lg min-h-100 bg-slate-50 flex items-center justify-center'>
				{isLoadingBanners ? (
					<span className='text-slate-400'>Đang tải Banner...</span>
				) : (
					<HomeBannerCarouselUi banners={banners} />
				)}
			</div>

			{/* DANH MỤC SẢN PHẨM */}
			<section className='max-w-7xl mx-auto mt-10 space-y-6'>
				{isLoadingCategories ? (
					<div className='flex flex-col items-center justify-center py-10 gap-2 text-slate-500 bg-white border border-slate-200 rounded-2xl'>
						<Spinner className='size-8' />
						<span>Đang tải danh mục...</span>
					</div>
				) : (
					<CategoryListUi categories={categories} />
				)}
			</section>

			{/* MÃ GIẢM GIÁ TOÀN NGHÀNH */}
			<section className='max-w-7xl mx-auto mt-10'>
				{isLoadingCoupons ? (
					<div className='flex items-center justify-center py-6 bg-white border shadow-sm border-slate-100 rounded-xl'>
						<Spinner className='size-6 text-slate-400' />
					</div>
				) : (
					<CouponListUi
						coupons={coupons}
						onClaimClick={handleClaimCoupon}
						label={'Mã giảm giá toàn nghành'}
					/>
				)}
			</section>

			{/* SẢN PHẨM BÁN CHẠY */}
			<section className='max-w-7xl mx-auto mt-14 space-y-6'>
				<div className='flex items-center gap-2 px-4 lg:px-0'>
					<Flame className='w-8 h-8 text-orange-500' />
					<h3 className='text-2xl font-bold md:text-3xl text-slate-900'>
						Sản phẩm bán chạy
					</h3>
				</div>

				<div className='rounded-2xl'>
					{isLoadingTopSelling ? (
						<div className='flex flex-col items-center gap-2 py-20 text-center text-slate-500'>
							<Spinner className='size-8' />
							<span>Đang tải danh sách bán chạy...</span>
						</div>
					) : (
						<ProductList products={topSellingProducts} />
					)}
				</div>
			</section>

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
							<Spinner className='size-8' />
						</div>
					) : (
						<ProductList products={products} />
					)}
				</div>
			</section>
		</>
	);
}
