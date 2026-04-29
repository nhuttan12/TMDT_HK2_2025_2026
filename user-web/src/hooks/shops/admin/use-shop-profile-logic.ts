'use client';

import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { ShopProfile } from '@/types/shops/ShopProfile';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface UseShopProfileLogicProps {
	initialData: ShopProfile;
	formType: AdminFormType;
	onMutate?: (data: ShopProfile) => Promise<void>;
}

export function useShopProfileLogic({
	initialData,
	formType,
	onMutate,
}: UseShopProfileLogicProps) {
	const router: AppRouterInstance = useRouter();

	const [form, setForm] = useState<ShopProfile>(initialData);
	const [loading, setLoading] = useState<boolean>(false);

	// Xác định trạng thái của form
	const isView: boolean = formType === 'view';
	const isCreate: boolean = formType === 'create';
	const isUpdate: boolean = formType === 'update';

	// Disable toàn bộ input nếu đang load hoặc ở chế độ chỉ xem
	const isDisabled: boolean = loading || isView;

	const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
		const { name, value } = e.target;

		setForm(
			(prev: ShopProfile): ShopProfile => ({
				...prev,
				[name]: value,
			}),
		);
	};

	const handleDescriptionChange = (value: string): void => {
		setForm(
			(prev: ShopProfile): ShopProfile => ({
				...prev,
				description: value,
			}),
		);
	};

	const handleSubmit = async (e: SyntheticEvent): Promise<void> => {
		e.preventDefault();

		if (isView || !onMutate) return; // Chặn nếu là View hoặc không truyền hàm Mutate

		try {
			setLoading(true);
			await onMutate(form); // Gọi hàm từ Container truyền vào
		} catch (error) {
			console.error('Submit error:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleEditClick = (): void => {
		// Redirect qua trang edit (điều chỉnh đường dẫn phù hợp với project của bạn)
		router.push('/admin/shop-info/edit');
	};

	const handleCancel = (): void => {
		router.back();
	};

	return {
		form: form,
		loading: loading,
		isView: isView,
		isCreate: isCreate,
		isUpdate: isUpdate,
		isDisabled: isDisabled,
		handleInputChange: handleInputChange,
		handleDescriptionChange: handleDescriptionChange,
		handleSubmit: handleSubmit,
		handleEditClick: handleEditClick,
		handleCancel: handleCancel,
	};
}
