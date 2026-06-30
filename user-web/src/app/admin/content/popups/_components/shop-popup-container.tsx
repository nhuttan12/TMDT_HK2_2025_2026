'use client';

import React, { useState, JSX } from 'react';
import { UseMutationResult } from '@tanstack/react-query';
import { useShopPopupLogic } from '@/hooks/contents/popups/use-shop-popup-logic';
import {
	useShopPopupQuery,
	useUpdateShopPopupMutation,
} from '@/queries/content/popups/shop-popup-query';
import { UpdatePopupPayload } from '@/types/shops/admin/UpdatePopupPayload';
import { ShopPopupUi } from '@/app/admin/content/popups/_components/shop-popup-ui';
import { Popup } from '@/types/shops/admin/Popup';

interface ShopPopupContainerProps {
	initialPopup?: Popup;
}

export function ShopPopupContainer({ initialPopup }: ShopPopupContainerProps): JSX.Element {
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	const { data: serverPopup } = useShopPopupQuery(initialPopup);

	const updateMutation: UseMutationResult<void, Error, UpdatePopupPayload> =
		useUpdateShopPopupMutation();

	const { popup, handleImageChange, handleToggleActive, isValidToSave, preparePayload } =
		useShopPopupLogic(serverPopup);

	const handleSave = (): void => {
		setErrorMsg(null);

		try {
			const payload: UpdatePopupPayload = preparePayload();

			// Lưu ý ở thực tế: Nếu popup.file tồn tại, bạn phải gọi hàm upload ảnh
			// lên Cloudinary/AWS S3 ở đây để lấy chuỗi URL mới, trước khi mutate payload.

			updateMutation.mutate(payload, {
				onSuccess: (): void => {
				},
				onError: (error: Error): void => {
					setErrorMsg(error.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
				},
			});
		} catch (error: unknown) {
			setErrorMsg('Dữ liệu không hợp lệ.');
		}
	};

	return (
		<ShopPopupUi
			popup={popup}
			isSubmitting={updateMutation.isPending}
			isValidToSave={isValidToSave}
			errorMsg={errorMsg}
			onImageChange={handleImageChange}
			onToggleActive={handleToggleActive}
			onSave={handleSave}
		/>
	);
}
