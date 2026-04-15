'use client';

import { SortableImageForm } from '@/types/images/admin/SortableImageForm';
import React, { useEffect, useState } from 'react';

import { UpdateBannerPayload } from '@/types/shops/UpdateBannerPayload';

interface UseShopBannerLogicReturn {
	banners: SortableImageForm[];
	setBanners: React.Dispatch<React.SetStateAction<SortableImageForm[]>>;
	isUploading: boolean;
	hasPrimary: boolean;
	isValidToSave: boolean;
	preparePayload: () => UpdateBannerPayload[];
}

export function useShopBannerLogic(serverBanners: SortableImageForm[]): UseShopBannerLogicReturn {
	// Local state cho thao tác DND và Upload chưa lưu
	const [banners, setBanners] = useState<SortableImageForm[]>(serverBanners);

	// Sync lại local state nếu server data thay đổi (VD: có ai đó update từ thiết bị khác)
	useEffect((): void => {
		setBanners(serverBanners);
	}, [serverBanners]);

	const isUploading: boolean = banners.some((b: SortableImageForm): boolean => b.status === 'uploading');
	const hasPrimary: boolean = banners.some((b: SortableImageForm): boolean => b.isPrimary);
	const isValidToSave: boolean = !isUploading && banners.length > 0 && hasPrimary;

	const preparePayload = (): UpdateBannerPayload[] => {
		return banners.map((banner: SortableImageForm, index: number) => ({
			id: banner.localId.length > 30 ? undefined : banner.localId,
			imageUrl: banner.imageUrl,
			order: index + 1,
			isPrimary: banner.isPrimary,
		}));
	};

	return {
		banners: banners,
		setBanners: setBanners,
		isUploading: isUploading,
		hasPrimary: hasPrimary,
		isValidToSave: isValidToSave,
		preparePayload: preparePayload,
	};
}
