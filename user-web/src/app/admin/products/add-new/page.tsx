import { JSX } from 'react';
import ProductAdminFormContainer from '@/app/admin/products/[productId]/_components/product-admin-form-container';
import { Metadata } from 'next';
import { ProductDetailInfoAdmin } from '@/types/products/admin/ProductDetailInfoAdmin';

export const metadata: Metadata = {
	title: 'Thêm mới thông tin sản phẩm',
};

const emptyProduct: ProductDetailInfoAdmin = {
	id: 0,
	name: '',
	slug: '',
	description: '',
	supplierName: '',

	importPrice: 0,
	discount: 0,

	status: true,
	categoryId: 0,
	images: [],

	createdAt: '',
	updatedAt: '',
};

export default function AddNewProductPage(): JSX.Element {
	return (
		<ProductAdminFormContainer
			productAdmin={emptyProduct}
			key={'create'}
			formType={'create'}
		/>
	);
}
