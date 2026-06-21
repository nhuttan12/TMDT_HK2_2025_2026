'use client';
import { authService, LoginPayload, LoginResponse } from '@/services/auth/authService';
import { useAuthStore } from '@/stores/auth.store';
import { useMutation } from '@tanstack/react-query';
import { useState, Dispatch, SetStateAction, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { ResponseApi } from '../../../types/common/ResponseApi';

export interface LoginReturn {
	loginWithGoogle: () => Promise<void>;
	handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
	isLoading: boolean;
	formData: LoginPayload;
	setFormData: Dispatch<SetStateAction<LoginPayload>>;
}

export function useLoginLogic(): LoginReturn {
	const router = useRouter();
	const login = useAuthStore((state) => state.login);
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const [formData, setFormData] = useState<LoginPayload>({ email: '', password: '' });

	useEffect((): void => {
		if (isAuthenticated) {
			router.push('/');
		}
	}, [isAuthenticated, router]);

	// Định nghĩa Mutation: Quản lý vòng đời của request Login
	const loginMutation = useMutation({
		// 1. Hàm thực thi chính
		mutationFn: ({ email, password }: LoginPayload): Promise<ResponseApi<LoginResponse>> => {
			return authService.login({ email, password });
		},
		// 2. Khi bắt đầu gửi request (thay cho setIsLoading(true))
		onMutate: () => {
			console.log('Đang bắt đầu đăng nhập...' + formData.email + ' - ' + formData.password);
		},

		// 3. Khi thành công
		onSuccess: (data: ResponseApi<LoginResponse>) => {
			console.log(data);
			// Cập nhật Zustand Store
			const user = {
				username: formData.email,
			};
			login(user);
			// Điều hướng người dùng
			router.push('/');
		},

		// 4. Khi thất bại (Thay cho try-catch)
		onError: (error: AxiosError<{ message: string }>) => {
			const errorMsg = error.response?.data?.message || 'Đăng nhập thất bại';
			alert(errorMsg);

			setFormData((prev) => ({
				...prev,
				password: '',
			}));
		},
	});

	const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		if (!formData.email || !formData.password) {
			alert('Vui lòng điền đầy đủ thông tin');
			return;
		}

		// Kích hoạt mutation
		loginMutation.mutate({
			email: formData.email,
			password: formData.password,
		});
	};

	return {
		loginWithGoogle: async (): Promise<void> => {
			await authService.loginWithGoogle();
		},
		formData: formData,
		handleSubmit,
		setFormData,
		isLoading: loginMutation.isPending,
	};
}
