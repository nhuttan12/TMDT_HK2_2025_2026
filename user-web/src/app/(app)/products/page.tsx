import { JSX } from 'react';
import ProductsContainer from '@/app/(app)/products/_components/products-container';
import { ProductUserCard } from '@/types/products/user/ProductUserCard';
import { getProductsHome } from '@/services/products/user/product-service';

export default async function ProductsPage(): Promise<JSX.Element> {
	const products: ProductUserCard[] = await getProductsHome();

	return <ProductsContainer initialProducts={products} />;
}
