import { ProductDetail } from '@/types/products/user/ProductDetail';
import { JSX } from 'react';
import {
	getProductDetailByIdCraw,
	getProductDetailById,
	getRelatedProductsCraw,
	getRelatedProducts,
} from '@/services/products/user/product-service';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ProductDetailContainer from './_components/product-detail-container';

interface Props {
	params: Promise<{ productId: string }>;
}

// 1. Tối ưu hóa SEO Metadata cho String ID
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const resolvedParams = await params;
	const productId: string = resolvedParams.productId;

	// Cập nhật logic validate: Kiểm tra chuỗi rỗng thay vì NaN
	if (!productId || productId.trim() === '') {
		return {
			title: 'Sản phẩm không tồn tại',
		};
	}

	try {
		// Truyền thẳng chuỗi productId vào Service
		const product: ProductDetail = await getProductDetailByIdCraw(productId);

		return {
			title: `Chi tiết sản phẩm | ${product.name}`,
			description: `Mua ${product.name} chính hãng với giá tốt nhất.`,
		};
	} catch {
		return {
			title: 'Sản phẩm không tồn tại',
		};
	}
}

// 2. Tối ưu hóa Server Component Render
export default async function ProductListPage({ params }: Props): Promise<JSX.Element> {
	const resolvedParams = await params;
	const productId: string = resolvedParams.productId;

	// Validate sớm để ngắt luồng nếu ID rỗng
	if (!productId || productId.trim() === '') {
		notFound();
	}

	// const product: ProductDetail = await getProductDetailByIdCraw(productId);

	console.log(productId);
	const product = await getProductDetailById(productId);
	// Gọi Service liên quan (Cần đảm bảo backend có thể handle việc get theo tên hoặc truyền string ID)
	const relatedProducts = await getRelatedProducts(productId);
	return (
		<ProductDetailContainer
			product={product}
			relatedProducts={relatedProducts}
		/>
	);
}