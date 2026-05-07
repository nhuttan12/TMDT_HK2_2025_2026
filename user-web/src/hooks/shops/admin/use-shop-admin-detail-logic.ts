'use client';

import { useShopAdminDetailQuery } from '@/queries/shops/admin/use-shop-admin-detail-query';
import { ShopAdminDetail } from '@/types/shops/admin/ShopAdminDetail';
import { useRouter } from 'next/navigation';

export function useShopAdminDetailLogic(id: number, initialData?: ShopAdminDetail) {
	const router = useRouter();
	const { data, isLoading } = useShopAdminDetailQuery(id, initialData);

	const handleBack = () => {
		router.back();
	};

	const handleBanShop = async () => {
		if (!confirm('Bạn có chắc chắn muốn cấm cửa hàng này? Toàn bộ sản phẩm sẽ bị ẩn.')) return;

		// TODO: Gọi Mutation API để cập nhật status thành 'banned'
		console.log('Đã cấm shop:', id);
		// Sau khi ban thành công, invalidate query hoặc tự redirect
	};

	const handleUnbanShop = async () => {
		if (!confirm('Mở khóa cho cửa hàng này?')) return;

		// TODO: Gọi Mutation API để cập nhật status thành 'active'
		console.log('Đã mở khóa shop:', id);
	};

	return {
		shop: data,
		isLoading,
		handleBack,
		handleBanShop,
		handleUnbanShop,
	};
}
