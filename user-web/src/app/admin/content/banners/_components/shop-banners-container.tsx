'use client';

import React, { useState, JSX } from 'react';
import { SortableImageForm } from '@/types/images/admin/SortableImageForm';
import {
	useShopBannersQuery,
	useUpdateShopBannersMutation,
} from '@/queries/content/banners/shop-banner-query';
import { useShopBannerLogic } from '@/hooks/contents/banners/use-shop-banner-logic';
import { UseMutationResult } from '@tanstack/react-query';
import { SortableImageManagerUi } from '@/components/contents/sortable-image-manager-ui';
import { UpdateBannerPayload } from '@/types/shops/UpdateBannerPayload';

interface ShopBannerContainerProps {
	initialBanners: SortableImageForm[];
}

export function ShopBannersContainer({ initialBanners }: ShopBannerContainerProps): JSX.Element {
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	// 1. Khởi tạo React Query (Server State)
	const { data: serverBanners = [] } = useShopBannersQuery(initialBanners);
	const updateMutation: UseMutationResult<void, Error, UpdateBannerPayload[]> =
		useUpdateShopBannersMutation();

	// 2. Khởi tạo Hook Logic Form (Local State)
	const { banners, setBanners, hasPrimary, isValidToSave, preparePayload } =
		useShopBannerLogic(serverBanners);

	// 3. Xử lý sự kiện kết nối
	const handleSave = (): void => {
		setErrorMsg(null);
		const payload: UpdateBannerPayload[] = preparePayload();

		updateMutation.mutate(payload, {
			onSuccess: (): void => {
				// Thành công: Có thể show Toast success, Query sẽ tự invalidate nếu setup
				console.log('Lưu thành công');
			},
			onError: (error: Error): void => {
				// Thất bại: Hiển thị lỗi ra UI
				setErrorMsg(error.message || 'Đã có lỗi xảy ra khi lưu banner. Vui lòng thử lại.');
			},
		});
	};

	// 4. Render UI
	return (
		<SortableImageManagerUi
			images={banners}
			setImages={setBanners}
			isSubmitting={updateMutation.isPending} // Lấy trạng thái loading từ Tanstack Query
			hasPrimary={hasPrimary}
			isValidToSave={isValidToSave}
			errorMsg={errorMsg}
			onSave={handleSave}
			title='Quản lý ảnh bìa của trang chủ'
			description='Kéo thả để sắp xếp thứ tự.'
		/>
	);
}
