'use client';

import {
    useProductDetailLogic
} from '@/hooks/products/user/use-product-detail-logic';
import { ProductDetail } from '@/types/products/user/ProductDetail';
import { ProductUserCard } from '@/types/products/user/ProductUserCard';
import { JSX } from 'react';
import { ProductDetailUi } from './product-detail-ui';

interface Props {
	product: ProductDetail;
	relatedProducts: ProductUserCard[];
}

export default function ProductDetailContainer({ product, relatedProducts }: Props) {
	const logic = useProductDetailLogic(product);
	return (
		<ProductDetailUi
			product={product}
			relatedProducts={relatedProducts}
			{...logic}
		/>
	);
}
