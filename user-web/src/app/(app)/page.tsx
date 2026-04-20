import { JSX } from 'react';
import { getHomeBanners } from '@/services/contents/home-banners/user/home-banners-service';
import { getProductsHome } from '@/services/products/user/product-service';
import HomeContainer from '@/app/(app)/_components/home-container';

export default async function HomePage(): Promise<JSX.Element> {
	const [initialBanners, initialProducts] = await Promise.all([
		getHomeBanners(),
		getProductsHome(),
	]);

	return (
		<HomeContainer
			initialBanners={initialBanners}
			initialProducts={initialProducts}
		/>
	);
}
