import { Metadata } from 'next';
import { getShopAdminDetail } from '@/services/shops/admin/shop-admin-detail-service';
import { ShopDetailContainer } from '../_components/shop-detail/shop-detail-container';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
	title: 'Chi tiết cửa hàng',
};

// Params type cho App Router
interface PageProps {
	params: Promise<{ shopId: string }>;
}

export default async function AdminShopDetailPage({ params }: PageProps) {
	const resolvedParams = await params;
	const shopId = Number(resolvedParams.shopId);

	if (isNaN(shopId)) {
		return notFound(); // Trả về trang 404 của Next.js
	}

	// SSR Fetching
	const initialData = await getShopAdminDetail(shopId);

	return (
		<ShopDetailContainer
			id={shopId}
			initialData={initialData}
		/>
	);
}
