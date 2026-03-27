import { JSX } from 'react';
import { Metadata } from 'next';
import ProductVariantDetailContainer from '@/app/admin/products/[productID]/variant/_components/product-variant-detail-container';
import { ProductVariantDetail } from '@/types/products/admin/variant/ProductVariantDetail';

export const metadata: Metadata = {
	title: 'Thêm biến thể sản phẩm',
};

interface Props {
	params: {
		productID: string;
	};
}

export default async function Page({ params }: Props): Promise<JSX.Element> {
	const resolvedParams = await params;

	// 2. Ép kiểu string sang number
	const productID: number = Number(resolvedParams.productID);

	const emptyProductVariant: ProductVariantDetail = {
		id: 0,
		productID: productID,
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
