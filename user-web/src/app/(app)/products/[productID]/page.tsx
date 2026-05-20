import { ProductDetail } from '@/types/products/user/ProductDetail';
import { ProductUserCard } from '@/types/products/user/ProductUserCard';
import { JSX } from 'react';
import { getProductDetailById, getRelatedProducts } from '@/services/products/user/product-service';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ProductDetailContainer from './_components/product-detail-container';

interface Props {
	params: Promise<{ productId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const resolvedParams = await params;
	const numericProductID: number = Number(resolvedParams.productId);

	// Nếu ID không hợp lệ, trả về SEO fallback
	if (Number.isNaN(numericProductID) || numericProductID <= 0) {
		return {
			title: 'Sản phẩm không tồn tại',
		};
	}

	try {
		const product: ProductDetail = await getProductDetailById(numericProductID);

		return {
			title: `Chi tiết sản phẩm | ${product.name}`,
			// Bạn có thể mở rộng thêm description, openGraph, keywords ở đây
			description: `Mua ${product.name} chính hãng với giá tốt nhất.`,
		};
	} catch {
		// Bắt lỗi trong trường hợp API sập hoặc không tìm thấy sản phẩm
		return {
			title: 'Sản phẩm không tồn tại',
		};
	}
}

export default async function ProductListPage({ params }: Props): Promise<JSX.Element> {
	const resolvedParams = await params;
	const numericProductID = Number(resolvedParams.productId);

	if (Number.isNaN(numericProductID) || numericProductID <= 0) {
		notFound();
	}

	const product: ProductDetail = await getProductDetailById(numericProductID);
	const relatedProducts: ProductUserCard[] = await getRelatedProducts(product.name);

	return (
		<ProductDetailContainer
			product={product}
			relatedProducts={relatedProducts}
		/>
	);
}
