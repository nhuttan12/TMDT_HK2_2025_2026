'use client';

import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { ShopProfile } from '@/types/shops/admin/ShopProfile';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { BaseImage } from '@/types/images/admin/BaseImage';

interface UseShopProfileLogicProps {
	initialData: ShopProfile;
	formType: AdminFormType;
	onMutate?: (data: ShopProfile) => Promise<void>;
}

export interface UseShopProfileLogicReturn {
	form: ShopProfile;
	loading: boolean;
	isView: boolean;
	isCreate: boolean;
	isUpdate: boolean;
	isDisabled: boolean;
	logoFile?: File;
	handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	handleDescriptionChange: (value: string) => void;
	handleLogoChange: (img?: BaseImage) => void;
	handleSubmit: (e: SyntheticEvent) => Promise<void>;
	handleEditClick: () => void;
	handleCancel: () => void;
}

export function useShopProfileLogic({
	initialData,
	formType,
	onMutate,
}: UseShopProfileLogicProps): UseShopProfileLogicReturn {
	const router: AppRouterInstance = useRouter();

	const [form, setForm] = useState<ShopProfile>(initialData);
	const [loading, setLoading] = useState<boolean>(false);

	// State lưu trữ File vật lý để chuẩn bị gửi lên Server
	const [logoFile, setLogoFile] = useState<File | undefined>(undefined);

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

    const handleLogoChange = (img?: BaseImage): void => {
		if (!img) {
			// Người dùng bấm xóa ảnh: Xóa file vật lý & Xóa luôn URL cũ trong form
			setLogoFile(undefined);
			setForm((prev) => ({ ...prev, logoUrl: '' }));
			return;
		}

		if (img.file) {
			// Người dùng chọn ảnh mới: Lưu file vật lý vào state để dành lúc Submit
			setLogoFile(img.file);
			// Lưu ý: Ta KHÔNG cập nhật logoUrl ở đây vì ảnh chưa được upload thực sự lên server
		}
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
		form,
		loading,
		isView,
		isCreate,
		isUpdate,
		isDisabled,
		logoFile, 
		handleInputChange,
		handleDescriptionChange,
		handleLogoChange, // Trả hàm xử lý ra ngoài
		handleSubmit,
		handleEditClick,
		handleCancel,
	};
}
