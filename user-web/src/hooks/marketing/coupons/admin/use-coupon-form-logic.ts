import { useState, SyntheticEvent } from 'react';
import { AdminCoupon } from '@/types/marketing/coupons/admin/AdminCoupon';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';

export interface CouponFormLogicReturn {
	formData: AdminCoupon;
	isLoading: boolean;
	handleInputChange: (key: keyof AdminCoupon, value: string | number | null) => void;
	handleTimeChange: (key: 'fromDate' | 'toDate', value: string) => void;
	handleSubmit: (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => void;
	isView: boolean;
	isUpdating: boolean;
	isCreating: boolean;
}

export const useCouponFormLogic = (
	mode: AdminFormType,
	initialData: AdminCoupon,
): CouponFormLogicReturn => {
	// Khởi tạo state cho toàn bộ form dựa trên data truyền vào
	const [formData, setFormData] = useState<AdminCoupon>(initialData);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// Lấy ra mode của admin
	const isView = mode === 'view';
	const isUpdating = mode === 'update';
	const isCreating = mode === 'create';

	// Hàm update các trường thông thường
	const handleInputChange = (key: keyof AdminCoupon, value: string | number | null): void => {
		setFormData(
			(prev: AdminCoupon): AdminCoupon => ({
				...prev,
				[key]: value,
			}),
		);
	};

	// Hàm update riêng cho object validTime
	const handleTimeChange = (key: 'fromDate' | 'toDate', value: string): void => {
		setFormData(
			(prev: AdminCoupon): AdminCoupon => ({
				...prev,
				validTime: {
					...prev.validTime,
					[key]: value,
				},
			}),
		);
	};

	// Hàm xử lý Submit Form
	const handleSubmit = async (e: SyntheticEvent<HTMLFormElement, SubmitEvent>): Promise<void> => {
		e.preventDefault();
		setIsLoading(true);

		try {
			console.log('Dữ liệu chuẩn bị gửi lên API:', formData);
			// Giả lập gọi API PUT
			await new Promise((resolve): void => {
				setTimeout(resolve, 1000);
			});
			alert('Cập nhật Coupon thành công!');
		} catch (error) {
			console.error('Lỗi khi cập nhật:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		formData: formData,
		isLoading: isLoading,
		handleInputChange: handleInputChange,
		handleTimeChange: handleTimeChange,
		handleSubmit: handleSubmit,
		isView: isView,
		isUpdating: isUpdating,
		isCreating: isCreating,
	};
};
