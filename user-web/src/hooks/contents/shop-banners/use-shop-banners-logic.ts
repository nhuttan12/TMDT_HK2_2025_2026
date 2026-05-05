'use client';

import { SortableImageForm } from '@/types/images/admin/SortableImageForm';
import React, { useEffect, useState } from 'react';
import { UpdateShopBannerPayload } from '@/types/shops/admin/UpdateShopBannerPayload';

interface UseShopBannerLogicReturn {
	homeBanners: SortableImageForm[];
	setHomeBanners: React.Dispatch<React.SetStateAction<SortableImageForm[]>>;
	isUploading: boolean;
	hasPrimary: boolean;
	isValidToSave: boolean;
	preparePayload: () => UpdateShopBannerPayload[];
}

export function useShopBannersLogic(serverBanners: SortableImageForm[]): UseShopBannerLogicReturn {
	// Local state cho thao tác DND và Upload chưa lưu
	const [homeBanners, setHomeBanners] = useState<SortableImageForm[]>(serverBanners);

	// Sync lại local state nếu server data thay đổi (VD: có ai đó update từ thiết bị khác)
	useEffect((): void => {
		setHomeBanners(serverBanners);
	}, [serverBanners]);

	const isUploading: boolean = homeBanners.some(
		(b: SortableImageForm): boolean => b.status === 'uploading',
	);
	const hasPrimary: boolean = homeBanners.some((b: SortableImageForm): boolean => b.isPrimary);
	const isValidToSave: boolean = !isUploading && homeBanners.length > 0 && hasPrimary;

	const preparePayload = (): UpdateShopBannerPayload[] => {
		return homeBanners.map((banner: SortableImageForm, index: number) => ({
			id: banner.localId.length > 30 ? undefined : banner.localId,
			imageUrl: banner.imageUrl,
			order: index + 1,
			isPrimary: banner.isPrimary,
		}));
	};

	return {
		homeBanners: homeBanners,
		setHomeBanners: setHomeBanners,
		isUploading: isUploading,
		hasPrimary: hasPrimary,
		isValidToSave: isValidToSave,
		preparePayload: preparePayload,
	};
}
