import { JSX } from 'react';
import { Metadata } from 'next';
import { ProductVariantDetail } from '@/types/products/admin/variant/ProductVariantDetail';
import { getProductVariantDetailById } from '@/services/products/admin/product-variant-service';
import ProductVariantDetailContainer from '../../_components/product-variant-detail-container';

export const metadata: Metadata = {
	title: 'Thông tin chi tiết biến thể sản phẩm',
};

interface Props {
	params: Promise<{
		id: string;
	}>;
}

export default async function Page({ params }: Props): Promise<JSX.Element> {
	const { id } = await params;
	const variant: ProductVariantDetail = await getProductVariantDetailById(Number(id));

	return (
		<ProductVariantDetailContainer
			initialData={variant}
			mode={'update'}
		/>
	);
}
