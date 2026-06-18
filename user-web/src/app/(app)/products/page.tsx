import { JSX } from 'react';
import ProductsContainer from '@/app/(app)/products/_components/products-container';
import { ProductUserCard, ProductUserCard2 } from '@/types/products/user/ProductUserCard';
import getProductHome2, { getProductsHome } from '@/services/products/user/product-service';
import { Metadata } from 'next';
import { PaginationResponse, PaginationResponse2 } from '@/types/shared/PaginationResponse';

export const metadata: Metadata = {
	title: 'Danh sách sản phẩm',
	description:
		'Khám phá danh sách các sản phẩm mới nhất, chất lượng cao với mức giá ưu đãi hấp dẫn. Mua sắm ngay hôm nay!',
	openGraph: {
		title: 'Danh sách sản phẩm',
		description:
			'Khám phá danh sách các sản phẩm mới nhất, chất lượng cao với mức giá ưu đãi hấp dẫn.',
		type: 'website',
	},
};

export default async function ProductsPage(): Promise<JSX.Element> {
	const products: ProductUserCard[] = await getProductsHome();
	const  products2 : PaginationResponse2<ProductUserCard2> = await getProductHome2();
	return <ProductsContainer initialProducts={products} />;
}
