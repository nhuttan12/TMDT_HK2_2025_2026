import { JSX } from 'react';
import { Metadata } from 'next';
import ProductVariantDetailContainer from '@/app/admin/products/[productId]/variant/_components/product-variant-detail-container';
import { ProductVariantDetail } from '@/types/products/admin/variant/ProductVariantDetail';

export const metadata: Metadata = {
	title: 'Thông tin chi tiết biến thể sản phẩm',
};

interface Props {
	params: {
		id: string;
	};
}

// giả lập fetch
async function getVariant(id: string): Promise<ProductVariantDetail> {
	const numberId: number = Number(id);

	return {
		id: numberId,
		productId: 101,
		name: 'Áo thun đen M',
		sku: 'TS-BLACK-M',
		attributes: [{ size: 'M', color: 'Đen' }],
		status: 'active',
		pricing: {
			salePrice: 100000,
			costPrice: 70000,
		},
		inventory: {
			available: 50,
			reserved: 5,
			incoming: 10,
		},
		shipping: {
			weightInGram: 200,
			dimensionsInCm: {
				length: 30,
				width: 20,
				height: 2,
			},
		},
		images: [
			{
				localID: 'img-1',
				imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
				isPrimary: true,
				order: 0,
				status: 'done',
			},
			{
				localID: 'img-2',
				imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c',
				isPrimary: false,
				order: 1,
				status: 'done',
			},
			{
				localID: 'img-3',
				imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f',
				isPrimary: false,
				order: 2,
				status: 'done',
			},
		],
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};
}

export default async function Page({ params }: Props): Promise<JSX.Element> {
	const variant: ProductVariantDetail = await getVariant(params.id);

	return (
		<ProductVariantDetailContainer
			initialData={variant}
			mode={'view'}
		/>
	);
}
