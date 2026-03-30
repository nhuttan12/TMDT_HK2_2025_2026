import { JSX } from 'react';
import { Metadata } from 'next';
import ProductVariantDetailContainer from '@/app/admin/products/[productId]/variant/_components/product-variant-detail-container';
import { ProductVariantDetail } from '@/types/products/admin/variant/ProductVariantDetail';

export const metadata: Metadata = {
	title: 'Thêm biến thể sản phẩm',
};

interface Props {
	params: {
		productId: string;
	};
}

export default function Page({ params }: Props): JSX.Element {
	const productId: number = Number(params.productId);

	const emptyProductVariant: ProductVariantDetail = {
		id: 0,
		productId: productId,
		name: '',
		sku: '',
		attributes: [{ size: '', color: '' }],
		status: 'active',
		pricing: {
			salePrice: 0,
			costPrice: 0,
		},
		inventory: {
			available: 0,
			reserved: 0,
			incoming: 0,
		},
		shipping: {
			weightInGram: 0,
			dimensionsInCm: {
				length: 0,
				width: 0,
				height: 0,
			},
		},
		images: [],
		createdAt: '',
		updatedAt: '',
	};

	return (
		<ProductVariantDetailContainer
			initialData={emptyProductVariant}
			mode={'create'}
		/>
	);
}
