import ProductAdminFormContainer from '@/components/products/admin/detail/product-admin-form-container';
import { getProductDetailAdminByProductId } from '@/services/products/admin/product-admin-service';
import { Metadata } from 'next';
import { JSX } from 'react';

interface Props {
	params: Promise<{ productId: string }>;
}

export const metadata: Metadata = {
	title: 'Quản lý thông tin chi tiết sản phẩm',
};

export default async function Index({ params }: Props): Promise<JSX.Element> {
	const { productId } = await params;
	const parsedId: number = parseInt(productId);

	// Fetch dữ liệu ở phía server
	const initialProductAdmin =
		await getProductDetailAdminByProductId(parsedId);

	return (
		<ProductAdminFormContainer
			key={'view'}
			formType={'view'}
			productId={parsedId}
			initialProductAdmin={initialProductAdmin}
			role={'admin'}
		/>
	);
}
