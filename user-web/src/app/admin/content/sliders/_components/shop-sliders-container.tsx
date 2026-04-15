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
import {
	useShopSlidersQuery,
	useUpdateShopSlidersMutation,
} from '@/queries/content/sliders/shop-slider-query';
import { UpdateSliderPayload } from '@/types/shops/UpdateSliderPayload';
import { useShopSliderLogic } from '@/hooks/contents/sliders/use-shop-slider-logic';

interface ShopBannerContainerProps {
	initialSliders: SortableImageForm[];
}

export function ShopSlidersContainer({ initialSliders }: ShopBannerContainerProps): JSX.Element {
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	// 1. Khởi tạo React Query (Server State)
	const { data: serverSliders = [] } = useShopSlidersQuery(initialSliders);

	const updateMutation: UseMutationResult<void, Error, UpdateSliderPayload[]> =
		useUpdateShopSlidersMutation();

	// 2. Khởi tạo Hook Logic Form (Local State)
	const { sliders, setSliders, hasPrimary, isValidToSave, preparePayload } =
		useShopSliderLogic(serverSliders);

	// 3. Xử lý sự kiện kết nối
	const handleSave = (): void => {
		setErrorMsg(null);
		const payload: UpdateSliderPayload[] = preparePayload();

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
		<SortableImageManagerUi
			images={sliders}
			setImages={setSliders}
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
