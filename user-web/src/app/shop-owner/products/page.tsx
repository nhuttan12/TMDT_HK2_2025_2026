import { JSX } from 'react';
import { ProductListInfoAdmin } from '@/types/products/admin/ProductListInfoAdmin';
import { Metadata } from 'next';
import { getProductListInfoAdmin } from '@/services/products/admin/product-admin-service';
import ProductAdminContainer from '@/components/products/admin/product-admin-container';

export const metadata: Metadata = {
	title: 'Quản lý sản phẩm của cửa hàng',
};

export default async function ProductsPage(): Promise<JSX.Element> {
	const products: ProductListInfoAdmin[] = await getProductListInfoAdmin();

	return (
		<ProductAdminContainer
			initialProducts={products}
			role={'shop-owner'}
		/>
	);
}
