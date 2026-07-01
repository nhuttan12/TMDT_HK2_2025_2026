import ProductAdminContainer from '@/components/products/admin/product-admin-container';
import apiServer from '@/lib/api-server';
import { ProductAdminService } from '@/services/products/admin/product-admin-service';
import { Metadata } from 'next';
import { JSX } from 'react';

export const metadata: Metadata = {
	title: 'Quản lý sản phẩm của nền tảng',
};

export default async function ProductsPage(): Promise<JSX.Element> {
    const productAdminService = new ProductAdminService(apiServer);

	const products = await productAdminService.getProductListInfoAdmin({pageNumber: 1, pageSize: 12});

	return (
		<ProductAdminContainer
			initialProducts={products}
			addLabel={'+ Phê duyệt sản phẩm cửa hàng'}
			role={'admin'}
		/>
	);
}
