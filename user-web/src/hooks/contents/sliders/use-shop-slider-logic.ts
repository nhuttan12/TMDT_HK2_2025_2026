'use client';

import { SortableImageForm } from '@/types/images/admin/SortableImageForm';
import React, { useEffect, useState } from 'react';
import { UpdateSliderPayload } from '@/types/shops/UpdateSliderPayload';


interface UseShopSliderLogicReturn {
	sliders: SortableImageForm[];
	setSliders: React.Dispatch<React.SetStateAction<SortableImageForm[]>>;
	isUploading: boolean;
	hasPrimary: boolean;
	isValidToSave: boolean;
	preparePayload: () => UpdateSliderPayload[];
}

export function useShopSliderLogic(serverBanners: SortableImageForm[]): UseShopSliderLogicReturn {
	// Local state cho thao tác DND và Upload chưa lưu
	const [sliders, setSliders] = useState<SortableImageForm[]>(serverBanners);

	// Sync lại local state nếu server data thay đổi (VD: có ai đó update từ thiết bị khác)
	useEffect((): void => {
		setSliders(serverBanners);
	}, [serverBanners]);

	const isUploading: boolean = sliders.some(
		(b: SortableImageForm): boolean => b.status === 'uploading',
	);
	const hasPrimary: boolean = sliders.some((b: SortableImageForm): boolean => b.isPrimary);
	const isValidToSave: boolean = !isUploading && sliders.length > 0 && hasPrimary;

	const preparePayload = (): UpdateSliderPayload[] => {
		return sliders.map((banner: SortableImageForm, index: number) => ({
			id: banner.localId.length > 30 ? undefined : banner.localId,
			imageUrl: banner.imageUrl,
			order: index + 1,
			isPrimary: banner.isPrimary,
		}));
	};

	return {
		sliders: sliders,
		setSliders: setSliders,
		isUploading: isUploading,
		hasPrimary: hasPrimary,
		isValidToSave: isValidToSave,
		preparePayload: preparePayload,
	};
}
