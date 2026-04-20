'use client';

import { JSX } from 'react';
import { HomeBanner } from '@/types/uis/HomeBanner';
import { ProductUserCard } from '@/types/products/user/ProductUserCard';
import { HomeUi } from './home-ui';
import { useHomeBannersQuery } from '@/queries/content/home-banners/user/use-home-banners-query';
import { useProductsHomeQuery } from '@/queries/products/user/use-product-query';
import {
	HomeBannerLogicReturn,
	useHomeBannerLogic,
} from '@/hooks/contents/home-banners/user/use-home-logic';

interface HomeContainerProps {
	initialBanners: HomeBanner[];
	initialProducts: ProductUserCard[];
}

export default function HomeContainer(props: HomeContainerProps): JSX.Element {
	const { initialBanners, initialProducts } = props;

	const { data: banners = [], isLoading: isLoadingBanners } = useHomeBannersQuery(initialBanners);
	const { data: products = [], isLoading: isLoadingProducts } =
		useProductsHomeQuery(initialProducts);

	const logic: HomeBannerLogicReturn = useHomeBannerLogic();

	return (
		<HomeUi
			banners={banners}
			products={products}
			isLoadingBanners={isLoadingBanners}
			isLoadingProducts={isLoadingProducts}
			{...logic}
		/>
	);
}
