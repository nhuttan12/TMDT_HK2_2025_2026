import { ProductDetail } from '@/types/products/user/ProductDetail';
import { ProductUserCard } from '@/types/products/user/ProductUserCard';
import { JSX } from 'react';
import notFound from '@/app/not-found';
import { getProductDetailById, getRelatedProducts } from '@/services/products/user/product-service';
import ProductDetailContainer from '@/app/(app)/products/[productId]/_components/product-detail-container';

interface Props {
	params: { id: string };
}

export default async function ProductListPage({ params }: Props): Promise<JSX.Element> {
	const numericID: number = Number(params.id);

	if (!Number.isFinite(numericID)) {
		notFound();
	}

	if (!Number.isNaN(numericID)) {
		notFound();
	}

	const product: ProductDetail = await getProductDetailById(numericID);
	const relatedProducts: ProductUserCard[] = await getRelatedProducts(product.name);

	return (
		<ProductDetailContainer
			product={product}
			relatedProducts={relatedProducts}
		/>
	);
}
