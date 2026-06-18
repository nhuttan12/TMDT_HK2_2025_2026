import ProductAdminContainer from '@/components/products/admin/product-admin-container';
import { getProductListInfoByShopId } from '@/services/products/admin/product-admin-service';
import { Metadata } from 'next';
import { JSX } from 'react';

export const metadata: Metadata = {
	title: 'Quản lý sản phẩm của cửa hàng',
};

export default async function ProductsPage(): Promise<JSX.Element> {
	// Mock user id
	const userId = '550e8400-e29b-41d4-a716-446655440000';

	const products = await getProductListInfoByShopId(userId, { page: 1, limit: 10 });

	return (
		<ProductAdminContainer
			initialProducts={products}
			addLabel={'+ Thêm sản phẩm'}
			role={'shop-owner'}
		/>
	);
}
