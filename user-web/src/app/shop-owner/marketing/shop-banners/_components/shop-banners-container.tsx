'use client';

import { useShopBannersLogic } from '@/hooks/contents/shop-banners/use-shop-banners-logic';
import {
    useShopBannersQuery,
    useUpdateShopBannerMutation,
} from '@/queries/content/shop-banners/shop-banner-query';
import { SortableImageForm } from '@/types/images/admin/SortableImageForm';
import { UpdateShopBannerPayload } from '@/types/shops/admin/UpdateShopBannerPayload';
import { UseMutationResult } from '@tanstack/react-query';
import { JSX, useState } from 'react';
import { ShopBannersUi } from './shop-banners-ui';

interface ShopBannerContainerProps {
	initialShopBanners: SortableImageForm[];
}

export function ShopBannersContainer({
	initialShopBanners,
}: ShopBannerContainerProps): JSX.Element {
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	// 1. Khởi tạo React Query (Server State)
	const { data: serverShopBanners = [] } = useShopBannersQuery(initialShopBanners);

	const updateMutation: UseMutationResult<void, Error, UpdateShopBannerPayload[]> =
		useUpdateShopBannerMutation();

	// 2. Khởi tạo Hook Logic Form (Local State)
	const { homeBanners, setHomeBanners, hasPrimary, isValidToSave, preparePayload } =
		useShopBannersLogic(serverShopBanners);

	// 3. Xử lý sự kiện kết nối
	const handleSave = (): void => {
		setErrorMsg(null);
		const payload: UpdateShopBannerPayload[] = preparePayload();

		updateMutation.mutate(payload, {
			onSuccess: (): void => {
				console.log('Lưu Slider thành công');
			},
			onError: (error: Error): void => {
				setErrorMsg(error.message || 'Đã có lỗi xảy ra khi lưu. Vui lòng thử lại.');
			},
		});
	};

	// 4. Render UI
	return (
		<ShopBannersUi
			images={homeBanners}
			setImages={setHomeBanners}
			isSubmitting={updateMutation.isPending} // Lấy trạng thái loading từ Tanstack Query
			hasPrimary={hasPrimary}
			isValidToSave={isValidToSave}
			errorMsg={errorMsg}
			onSave={handleSave}
			title='Hình ảnh quảng cáo ở trang của cửa hàng'
			description='Thêm tối đa 8 hình ảnh.'
		/>
	);
}
