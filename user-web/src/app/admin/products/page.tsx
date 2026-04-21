import { JSX } from 'react';
import ProductAdminContainer from '@/app/admin/products/_components/product-admin-container';
import { ProductListInfoAdmin } from '@/types/products/admin/ProductListInfoAdmin';
import { Metadata } from 'next';
import { fetchProductListInfoAdmin } from '@/services/products/admin/product-admin-service';



export const metadata: Metadata = {
	title: 'Quản lý sản phẩm của cửa hàng',
};

export default async function ProductsPage(): Promise<JSX.Element> {
	const products: ProductListInfoAdmin[] = await fetchProductListInfoAdmin();

	return <ProductAdminContainer initialProducts={products} />;
}
