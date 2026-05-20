import { JSX } from 'react';
import { Metadata } from 'next';
import { ProductVariantDetail } from '@/types/products/admin/variant/ProductVariantDetail';
import ProductVariantDetailContainer from '@/components/products/variant/admin/product-variant-detail-container';

export const metadata: Metadata = {
	title: 'Thêm sản phẩm phân loại',
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
		attributes: [{ size: ''}],
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
        systemStatus: 'pending_approval',
		images: [],
		createdAt: '',
		updatedAt: '',

		supplierName: '',
	};

	return (
		<ProductVariantDetailContainer
			initialData={emptyProductVariant}
			mode={'create'}
			role={'shop-owner'}
		/>
	);
}
