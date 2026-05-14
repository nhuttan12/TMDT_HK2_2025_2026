import { Metadata } from 'next';
import { getAdminShops } from '@/services/shops/admin/shop-admin-service';
import ShopManagementContainer from './_components/shop-management-container';

export const metadata: Metadata = {
	title: 'Quản lý cửa hàng',
	description: 'Trang quản trị danh sách cửa hàng đăng ký trên hệ thống.',
};

interface PageProps {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AdminShopsPage({ searchParams }: PageProps) {
	// Lấy params từ Server
	const resolvedParams = await searchParams;

    const page = Number(resolvedParams.page) || 1;
	const name = typeof resolvedParams.name === 'string' ? resolvedParams.name : undefined;
	const status = typeof resolvedParams.status === 'string' ? resolvedParams.status : undefined;

	// Fetch Data phía Server (SSR) để SEO và Render nhanh khung xương HTML
	const initialData = await getAdminShops(page, name, status);

	return <ShopManagementContainer initialData={initialData} />;
}
