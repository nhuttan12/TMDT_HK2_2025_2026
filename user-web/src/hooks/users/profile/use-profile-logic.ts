'use client';

import { useState, useEffect, SyntheticEvent } from 'react';
import { UserProfileInfo } from '@/types/users/user/UserProfileInfo';
import { UserService } from '@/services/users/user/profile-service';
import apiClient from '@/lib/api-client';

export interface ProfileLogicReturn {
	formData: UserProfileInfo;
	isSubmitting: boolean;
	handleChange: (field: keyof UserProfileInfo, value: string) => void;
	handleSubmit: (e: SyntheticEvent<HTMLFormElement>) => Promise<void>;
}

const defaultFormData: UserProfileInfo = {
	id: 0,
	fullName: '',
	email: '',
	phone: '',
	address1: {
		id: '',
		addressUrl: '',
		isUsed: true,
	},
	address2: {
		id: '',
		addressUrl: '',
		isUsed: true,
	},
	address3: {
		id: '',
		addressUrl: '',
		isUsed: true,
	},
	avatarUrl: '',
};

export function useProfileLogic(profile?: UserProfileInfo): ProfileLogicReturn {
	const [formData, setFormData] = useState<UserProfileInfo>(defaultFormData);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const userService = new UserService(apiClient);

	// Đồng bộ dữ liệu từ API vào Local Form State
	useEffect(() => {
		if (profile) {
			setFormData(profile);
		}
	}, [profile]);

	const handleChange = (field: keyof UserProfileInfo, value: string): void => {
		setFormData((prev: UserProfileInfo) => {
			// Xử lý riêng biệt nếu field là một trong 3 địa chỉ
			if (field === 'address1' || field === 'address2' || field === 'address3') {
				return {
					...prev,
					[field]: {
						...prev[field], // Giữ nguyên các thuộc tính cũ như id, isUsed
						addressUrl: value, // Chỉ đè giá trị mới vào trường addressUrl
					},
				};
			}

			// Xử lý chung cho các trường cơ bản dạng string (fullName, phone, email...)
			return {
				...prev,
				[field]: value,
			};
		});
	};

	const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();

		try {
			setIsSubmitting(true);
			console.log('Dữ liệu chuẩn bị cập nhật:', formData);

			await userService.updateProfile(formData);
			// TODO: Hiển thị Toast thành công
		} catch (error) {
			console.error('Lỗi cập nhật:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return {
		formData,
		isSubmitting,
		handleChange,
		handleSubmit,
	};
}
