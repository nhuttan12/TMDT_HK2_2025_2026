import ProductAdminContainer from '@/components/products/admin/product-admin-container';
import { getProductListInfoAdmin } from '@/services/products/admin/product-admin-service';
import { Metadata } from 'next';
import { JSX } from 'react';

export const metadata: Metadata = {
	title: 'Quản lý sản phẩm của cửa hàng',
};

export default async function ProductsPage(): Promise<JSX.Element> {
	const products = await getProductListInfoAdmin();

	return (
		<ProductAdminContainer
			initialProducts={products}
			role={'admin'}
		/>
	);
}
