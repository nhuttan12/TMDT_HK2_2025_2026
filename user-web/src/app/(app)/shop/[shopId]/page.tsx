import { getShopPublicInfoById } from '@/services/shops/user/shop-service';
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
	const shopId = resolvedParams.shopId;

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
		console.error(error);
		notFound();
	}
}

// 2. RENDER TRANG CHÍNH (SERVER COMPONENT)
export default async function ShopStorefrontPage({ params }: Props): Promise<JSX.Element> {
	const resolvedParams = await params;
	const shopId = resolvedParams.shopId;

	const shopInfo = await getShopPublicInfoById(shopId);

	return (
		<ShopStorefrontContainer
			shopId={shopId}
			initialShopInfo={shopInfo}
		/>
	);
}
