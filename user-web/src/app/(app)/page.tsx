import { JSX } from 'react';
import { getHomeBanners } from '@/services/contents/home-banners/user/home-banners-service';
import { getProductsHomeCraw, getTopSellingProducts } from '@/services/products/user/product-service';
import HomeContainer from '@/app/(app)/_components/home-container';
import { getCategories, getCategoriesCraw } from '@/services/categories/user/category-service';
import { getPlatformCoupons } from '@/services/marketing/coupon/user/user-coupon-service';

export default async function HomePage(): Promise<JSX.Element> {
	const [initialBanners, initialProducts, initialCategories, initialTopSelling, initialCoupons] =
		await Promise.all([
			getHomeBanners(),
			getProductsHomeCraw(),
			getCategories(),
			getTopSellingProducts(),
			getPlatformCoupons(),
		]);
	return (
		<HomeContainer
			initialBanners={initialBanners}
			initialProducts={initialProducts}
			initialCategories={initialCategories}
			initialTopSelling={initialTopSelling}
			initialCoupons={initialCoupons}
		/>
	);
}
