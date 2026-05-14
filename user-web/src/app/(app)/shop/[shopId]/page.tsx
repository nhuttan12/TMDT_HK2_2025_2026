import { getShopPublicInfoById } from '@/services/shops/user/shop-storefront-service';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JSX } from 'react';
import { ShopStorefrontContainer } from './_components/shop-storefront-container';

interface Props {
	// Kể từ Next.js 15+, params bắt buộc phải là một Promise
	params: Promise<{ shopId: string }>;
}

// 1. TẠO META DATA ĐỘNG CHO SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const resolvedParams = await params;
	const shopId: number = parseInt(resolvedParams.shopId, 10);

	// Xử lý an toàn nếu ID không hợp lệ
	if (isNaN(shopId)) {
		return { title: 'Cửa hàng không tồn tại' };
	}

	try {
		const shopInfo = await getShopPublicInfoById(shopId);

		return {
			title: shopInfo.seoTitle || shopInfo.name,
			description: shopInfo.metaDescription || shopInfo.description,
			openGraph: {
				title: shopInfo.seoTitle,
				description: shopInfo.metaDescription,
				images: [shopInfo.coverUrl], // Ảnh bìa sẽ hiển thị khi share link qua Zalo/Facebook
			},
		};
	} catch (error) {
		return { title: 'Lỗi tải cửa hàng' };
	}
}

// 2. RENDER TRANG CHÍNH (SERVER COMPONENT)
export default async function ShopStorefrontPage({ params }: Props): Promise<JSX.Element> {
	const resolvedParams = await params;
	const shopId: number = parseInt(resolvedParams.shopId, 10);

	if (isNaN(shopId)) {
		notFound(); // Tự động đẩy sang trang 404 của Next.js
	}

	try {
		// Fetch dữ liệu trên Server để mồi (hydrate) cho giao diện
		const shopInfo = await getShopPublicInfoById(shopId);

		return (
			<ShopStorefrontContainer
				shopId={shopId}
				initialShopInfo={shopInfo}
			/>
		);
	} catch (error) {
		// Nếu API ném lỗi (ví dụ shop bị khóa hoặc không tìm thấy ID)
		notFound();
	}
}
