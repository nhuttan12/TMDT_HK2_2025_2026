'use client';

import React, { useState, JSX } from 'react';
import { SortableImageForm } from '@/types/images/admin/SortableImageForm';
import {
	useHomeBannersQueryAdmin,
	useUpdateHomeBannersAdminMutation,
} from '@/queries/content/home-banners/admin/home-banner-query-admin';
import { useHomeBannerLogicAdmin } from '@/hooks/contents/home-banners/admin/use-home-banner-logic-admin';
import { UseMutationResult } from '@tanstack/react-query';
import { SortableImageManagerUi } from '@/components/contents/sortable-image-manager-ui';
import { UpdateHomeBannerPayload } from '@/types/shops/admin/UpdateHomeBannerPayload';

interface ShopBannerContainerProps {
	initialBanners: SortableImageForm[];
}

export function ShopBannersContainer({ initialBanners }: ShopBannerContainerProps): JSX.Element {
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	// 1. Khởi tạo React Query (Server State)
	const { data: serverBanners = [] } = useHomeBannersQueryAdmin(initialBanners);
	const updateMutation: UseMutationResult<void, Error, UpdateHomeBannerPayload[]> =
		useUpdateHomeBannersAdminMutation();

	// 2. Khởi tạo Hook Logic Form (Local State)
	const { banners, setBanners, hasPrimary, isValidToSave, preparePayload } =
		useHomeBannerLogicAdmin(serverBanners);

	// 3. Xử lý sự kiện kết nối
	const handleSave = (): void => {
		setErrorMsg(null);
		const payload: UpdateHomeBannerPayload[] = preparePayload();

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
