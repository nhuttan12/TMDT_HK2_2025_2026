import ProductsContainer from '@/app/(app)/products/_components/products-container';
import { getPageProducts } from '@/services/products/user/product-service';
import { Metadata } from 'next';
import { JSX } from 'react';
import {PaginationParams} from "@/types/common/Pagination";

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
	const pageRequest: PaginationParams = {
		pageSize :  12,
		pageNumber: 1
	}
	const products = await getPageProducts(pageRequest);
	console.log(products);
	return <ProductsContainer initialProducts={products} />;
}
