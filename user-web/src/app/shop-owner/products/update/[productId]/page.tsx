import ProductAdminFormContainer from '@/components/products/admin/detail/product-admin-form-container';
import apiServer from '@/lib/api-server';
import { ProductAdminService } from '@/services/products/admin/product-admin-service';
import { Metadata } from 'next';
import { JSX } from 'react';

export const metadata: Metadata = {
	title: 'Chỉnh sửa thông tin sản phẩm',
};

interface Props {
	params: Promise<{ productId: string }>;
}

export default async function AddNewProductPage({ params }: Props): Promise<JSX.Element> {
	const { productId } = await params;

	const productAdminService = new ProductAdminService(apiServer);

	// Fetch dữ liệu ở phía server
	const initialProductAdmin =
		await productAdminService.getProductDetailAdminByProductId(productId);

	return (
		<ProductAdminFormContainer
			key={'update'}
			formType={'update'}
			productId={productId}
			initialProductAdmin={initialProductAdmin}
			role={'shop-owner'}
		/>
	);
}
