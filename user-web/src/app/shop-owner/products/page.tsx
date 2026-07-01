import ProductAdminContainer from '@/components/products/admin/product-admin-container';
import apiServer from '@/lib/api-server';
import { ProductAdminService } from '@/services/products/admin/product-admin-service';
import { Metadata } from 'next';
import { JSX } from 'react';

export const metadata: Metadata = {
	title: 'Quản lý sản phẩm của cửa hàng',
};

export default async function ProductsPage(): Promise<JSX.Element> {
	// Mock user id
    const productAdminService = new ProductAdminService(apiServer);

	const products = await productAdminService.getProductListInfoByShopId({ page: 1, limit: 10 });

	return (
		<ProductAdminContainer
			initialProducts={products}
			addLabel={'+ Thêm sản phẩm'}
			role={'shop-owner'}
		/>
	);
}
