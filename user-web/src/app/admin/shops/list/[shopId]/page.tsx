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
	const shopId = resolvedParams.shopId;

	// SSR Fetching
	const initialData = await getShopAdminDetail(shopId);

	return (
		<ShopDetailContainer
			id={shopId}
			initialData={initialData}
		/>
	);
}
