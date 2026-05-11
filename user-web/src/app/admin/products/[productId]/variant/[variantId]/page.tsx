import ProductVariantDetailContainer from '@/components/products/variant/admin/product-variant-detail-container';
import { getProductVariantDetailById } from '@/services/products/admin/product-variant-service';
import { Metadata } from 'next';
import { JSX } from 'react';

export const metadata: Metadata = {
	title: 'Thông tin chi tiết biến thể sản phẩm',
};

interface Props {
	params: Promise<{
		variantId: string;
	}>;
}

export default async function Page({ params }: Props): Promise<JSX.Element> {
	const { variantId } = await params;
	const variant = await getProductVariantDetailById(Number(variantId));

	return (
		<ProductVariantDetailContainer
			initialData={variant}
			mode={'view'}
            role={'admin'}
		/>
	);
}
