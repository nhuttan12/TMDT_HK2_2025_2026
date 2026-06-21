'use client';

import { useHomeBannerLogic } from '@/hooks/contents/home-banners/user/use-home-logic';
import { useCategoriesQuery } from '@/queries/categories/user/use-categories-query';
import { useHomeBannersQuery } from '@/queries/content/home-banners/user/use-home-banners-query';
import { useProductsHomeQuery } from '@/queries/products/user/use-product-query';
import { useTopSellingProductsQuery } from '@/queries/products/user/use-top-selling-products-query';
import { CategoryItem } from '@/types/categories/user/CategoryItem';
import { UserCoupon } from '@/types/marketing/coupons/user/UserCoupon';
import { ProductUserCard } from '@/types/products/user/ProductUserCard';
import { JSX } from 'react';
import { HomeUi } from './home-ui';
import { useClaimCouponMutation, usePlatformCouponsQuery } from '@/queries/marketing/coupons/user/use-coupon-user-query';
import { HomeBanner } from '@/types/contents/banners/HomeBanner';

interface HomeContainerProps {
	initialBanners: HomeBanner[];
	initialProducts: ProductUserCard[];
	initialCategories: CategoryItem[];
	initialTopSelling: ProductUserCard[];
	initialCoupons: UserCoupon[];
}

export default function HomeContainer({
	initialBanners,
	initialProducts,
	initialCategories,
	initialTopSelling,
	initialCoupons,
}: HomeContainerProps): JSX.Element {
	const { data: banners = [], isLoading: isLoadingBanners } = useHomeBannersQuery(initialBanners);
	const { data: products = [], isLoading: isLoadingProducts } = useProductsHomeQuery(initialProducts);
	const { data: categories = [], isLoading: isLoadingCategories } = useCategoriesQuery(initialCategories);
	const { data: topSellingProducts = [], isLoading: isLoadingTopSelling } = useTopSellingProductsQuery(initialTopSelling);
	const { data: coupons = [], isLoading: isLoadingCoupons } = usePlatformCouponsQuery(initialCoupons);
	const claimMutation = useClaimCouponMutation();

	const logic = useHomeBannerLogic();

	return (
		<HomeUi
			banners={banners}
			products={products}
			categories={categories}
			topSellingProducts={topSellingProducts}
			coupons={coupons}
			isLoadingBanners={isLoadingBanners}
			isLoadingProducts={isLoadingProducts}
			isLoadingCategories={isLoadingCategories}
			isLoadingTopSelling={isLoadingTopSelling}
			isLoadingCoupons={isLoadingCoupons}
			handleClaimCoupon={(code: string) => claimMutation.mutate(code)}
			{...logic}
		/>
	);
}
