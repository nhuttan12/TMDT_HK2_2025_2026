'use client';

import { useState, useEffect } from 'react';
import { UserProfileInfo } from '@/types/users/user/UserProfileInfo';

export interface ProfileLogicReturn {
	formData: UserProfileInfo;
	isSubmitting: boolean;
	handleChange: (field: keyof UserProfileInfo, value: string) => void;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const defaultFormData: UserProfileInfo = {
	id: 0,
	fullName: '',
	email: '',
	phone: '',
	address1: '',
	address2: '',
	address3: '',
};

export function useProfileLogic(profile?: UserProfileInfo): ProfileLogicReturn {
	const [formData, setFormData] = useState<UserProfileInfo>(defaultFormData);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	// Đồng bộ dữ liệu từ API vào Local Form State
	useEffect(() => {
		if (profile) {
			setFormData(profile);
		}
	}, [profile]);

	const handleChange = (field: keyof UserProfileInfo, value: string): void => {
		setFormData((prev: UserProfileInfo) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();

		try {
			setIsSubmitting(true);
			// TODO: Gọi Mutation Hook để gửi formData lên server lưu lại
			console.log('Dữ liệu chuẩn bị cập nhật:', formData);

			await new Promise((resolve) => setTimeout(resolve, 1000)); // Giả lập loading
			// TODO: Hiển thị Toast thành công
		} catch (error) {
			console.error('Lỗi cập nhật:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return {
		formData: formData,
		isSubmitting: isSubmitting,
		handleChange: handleChange,
		handleSubmit: handleSubmit,
	};
}
