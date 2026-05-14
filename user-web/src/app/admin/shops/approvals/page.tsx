import { Metadata } from 'next';
import { getApprovalShops } from '@/services/shops/admin/shop-approval-service';
import { ShopApprovalContainer } from './_components/shop-approval-container';

export const metadata: Metadata = {
	title: 'Phê duyệt đăng ký | Quản trị Cửa hàng',
	description: 'Trang kiểm duyệt các đơn xin cấp phép mở cửa hàng mới.',
};

// Chuẩn Next.js 15: searchParams là Promise
interface PageProps {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AdminShopApprovalPage({ searchParams }: PageProps) {
	const resolvedParams = await searchParams;

	const page = Number(resolvedParams.page) || 1;
	const name = typeof resolvedParams.name === 'string' ? resolvedParams.name : undefined;

	// Ép kiểu status sang type mới
	const status =
		typeof resolvedParams.status === 'string'
			? (resolvedParams.status)
			: undefined;

	const initialData = await getApprovalShops({ page, name, status });

	return <ShopApprovalContainer initialData={initialData} />;
}
