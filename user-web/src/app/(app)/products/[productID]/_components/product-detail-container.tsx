'use client';

import { ProductDetail } from '@/types/products/user/ProductDetail';
import { ProductUserCard } from '@/types/products/user/ProductUserCard';
import { JSX } from 'react';
import {
	ProductDetailLogicReturn,
	useProductDetailLogic,
} from '@/hooks/products/user/use-product-detail-logic';
import { ProductDetailUi } from './product-detail-ui';

interface Props {
	product: ProductDetail;
	relatedProducts: ProductUserCard[];
}

export default function ProductDetailContainer({ product, relatedProducts }: Props): JSX.Element {
	const logic: ProductDetailLogicReturn = useProductDetailLogic(product);

	return (
		<ProductDetailUi
			product={product}
			relatedProducts={relatedProducts}
			{...logic}
		/>
	);
}
