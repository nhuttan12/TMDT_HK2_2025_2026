import ProductAdminFormContainer from '@/components/products/admin/detail/product-admin-form-container';
import { getProductDetailAdminByProductId } from '@/services/products/admin/product-admin-service';
import { Metadata } from 'next';
import { JSX } from 'react';

interface Props {
	params: Promise<{ approvalId: string }>;
}

export const metadata: Metadata = {
	title: 'Xem thông tin sản phẩm để phê duyệt',
};

export default async function Index({ params }: Props): Promise<JSX.Element> {
	const { approvalId } = await params;

	// Fetch dữ liệu ở phía server
	const initialProductAdmin = await getProductDetailAdminByProductId(approvalId);

	return (
		<ProductAdminFormContainer
			key={'view'}
			formType={'view'}
			productId={approvalId}
			initialProductAdmin={initialProductAdmin}
			role={'admin'}
            productApproval={true}
		/>
	);
}
