import { JSX } from 'react';
import { Metadata } from 'next';
import { ProductDetailInfoAdmin } from '@/types/products/admin/ProductDetailInfoAdmin';
import { getProductDetailAdminByProductId } from '@/services/products/admin/product-admin-service';
import ProductAdminFormContainer from '@/components/products/admin/detail/product-admin-form-container';

export const metadata: Metadata = {
	title: 'Chỉnh sửa thông tin sản phẩm',
};

interface Props {
	params: Promise<{ productId: string }>;
}

export default async function AddNewProductPage({ params }: Props): Promise<JSX.Element> {
	const { productId } = await params;
	const parsedId: number = parseInt(productId);

	// Fetch dữ liệu ở phía server
	const initialProductAdmin: ProductDetailInfoAdmin =
		await getProductDetailAdminByProductId(parsedId);

	return (
		<ProductAdminFormContainer
			key={'update'}
			formType={'update'}
			productId={parsedId}
			initialProductAdmin={initialProductAdmin}
			role={'shop-owner'}
		/>
	);
}
