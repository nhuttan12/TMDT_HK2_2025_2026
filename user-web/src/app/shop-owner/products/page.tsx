import ProductAdminContainer from '@/components/products/admin/product-admin-container';
import { getProductListInfoByShopId } from '@/services/products/admin/product-admin-service';
import { Metadata } from 'next';
import { JSX } from 'react';

export const metadata: Metadata = {
	title: 'Quản lý sản phẩm của cửa hàng',
};

export default async function ProductsPage(): Promise<JSX.Element> {
	// Mock user id
	const userId = 1;

	const products = await getProductListInfoByShopId(userId);

	return (
		<ProductAdminContainer
			initialProducts={products}
			addLabel={'+ Thêm sản phẩm'}
			role={'shop-owner'}
		/>
	);
}
