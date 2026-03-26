import { JSX } from 'react';
import ProductAdminFormClient from '@/components/product/admin/product-admin-form-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Thêm mới thông tin sản phẩm',
};

export default function AddNewProductPage(): JSX.Element {
	return (
		<ProductAdminFormClient
			key={'create'}
			formType={'create'}
		/>
	);
}
