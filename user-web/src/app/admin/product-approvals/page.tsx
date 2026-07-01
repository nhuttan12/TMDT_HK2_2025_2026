import { apiClient } from '@/lib/api-client';
import {
    ProductAdminService
} from '@/services/products/admin/product-admin-service';
import { Metadata } from 'next';
import { JSX } from 'react';
import ProductApprovalContainer from './_components/product-approval-container';

export const metadata: Metadata = {
	title: 'Phê duyệt sản phẩm được đăng bán của cửa hàng',
};

export default async function ProductsPage(): Promise<JSX.Element> {
	const productAdminService = new ProductAdminService(apiClient);

	const products = await productAdminService.getProductApprovalListAdmin({
		pageNumber: 1,
		pageSize: 12,
	});

	return (
		<ProductApprovalContainer
			initialProducts={products}
			role={'admin'}
			productApproval={true}
			customTitle={'Phê duyệt sản phẩm'}
			customDescription={'Phê duyệt sản phẩm của tất cả cửa hàng'}
		/>
	);
}
