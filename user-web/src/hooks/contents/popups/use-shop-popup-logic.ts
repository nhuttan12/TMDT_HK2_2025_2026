'use client';

import { Popup } from '@/types/shops/admin/Popup';
import { BaseImage } from '@/types/images/admin/BaseImage';
import { UpdatePopupPayload } from '@/types/shops/admin/UpdatePopupPayload';
import { useEffect, useState } from 'react';

interface UseShopPopupLogicReturn {
	popup: Popup | undefined;
	handleImageChange: (img?: BaseImage) => void;
	handleToggleActive: (isActive: boolean) => void;
	isValidToSave: boolean;
	preparePayload: () => UpdatePopupPayload;
}

export function useShopPopupLogic(serverPopup?: Popup): UseShopPopupLogicReturn {
	const [popup, setPopup] = useState<Popup | undefined>(serverPopup);

	// Đồng bộ data từ server khi load xong
	useEffect((): void => {
		if (serverPopup) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setPopup(serverPopup);
		}
	}, [serverPopup]);

	// Handler cập nhật hình ảnh (từ SingleImageUpload)
	const handleImageChange = (img?: BaseImage): void => {
		if (!img) {
			// Nếu xoá ảnh, giữ lại ID và Trạng thái, chỉ xoá url/file
			setPopup((prev: Popup | undefined): Popup | undefined =>
				prev ? { ...prev, file: undefined, imageUrl: undefined } : undefined,
			);
			return;
		}

		setPopup(
			(prev: Popup | undefined): Popup => ({
				id: prev?.id,
				isActive: prev?.isActive ?? true, // Mặc định bật nếu là popup mới
				file: img.file,
				imageUrl: img.imageUrl,
			}),
		);
	};

	// Handler bật/tắt popup
	const handleToggleActive = (isActive: boolean): void => {
		setPopup((prev: Popup | undefined): Popup | undefined =>
			prev ? { ...prev, isActive } : prev,
		);
	};

	// Hợp lệ khi có object và (có file upload mới HOẶC có sẵn imageUrl từ server)
	const isValidToSave: boolean = !!popup && (!!popup.file || !!popup.imageUrl);

	const preparePayload = (): UpdatePopupPayload => {
		if (!popup) throw new Error('Không có dữ liệu Popup để lưu');

		return {
			id: popup.id,
			imageUrl: popup.imageUrl,
			isActive: popup.isActive,
		};
	};

	return {
		popup: popup,
		handleImageChange: handleImageChange,
		handleToggleActive: handleToggleActive,
		isValidToSave: isValidToSave,
		preparePayload: preparePayload,
	};
}
