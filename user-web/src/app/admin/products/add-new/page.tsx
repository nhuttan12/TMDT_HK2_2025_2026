import { JSX } from 'react';
import ProductAdminFormContainer from '@/app/admin/products/[productID]/_components/product-admin-form-container';
import { Metadata } from 'next';
import { ProductDetailInfoAdmin } from '@/types/products/admin/ProductDetailInfoAdmin';

export const metadata: Metadata = {
	title: 'Thêm mới thông tin sản phẩm',
};

const emptyProduct: ProductDetailInfoAdmin = {
	id: 0,
	name: '',
	slug: '',
	brand: '',
	description: '',

	importPrice: 0,
	discount: 0,

	status: true,
	categoryID: 0,
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
