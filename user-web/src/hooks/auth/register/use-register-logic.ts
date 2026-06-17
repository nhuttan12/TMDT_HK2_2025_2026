import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { authService, RegisterResponse } from '@/services/auth/authService';
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'next/navigation';

interface registerPayload {
	email : string;
	password: string;
	phone: string;
	fullName: string;
	retypePassword: string;
	[key: string]: string;
}
export interface RegisterReturn {
	isVisible: boolean;
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	formData: registerPayload;
	setFormData: React.Dispatch<React.SetStateAction<registerPayload>>;
}
export const useRegisterLogic = () => {
	const router = useRouter();
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const login = useAuthStore((state) => state.login);
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const [formData, setFormData] = useState<registerPayload>({
		email: '',
		password: '',
		phone: '',
		fullName: '',
		retypePassword: '',
	});
	useEffect((): void => {
		if (isAuthenticated) {
			router.push('/');
		}
	}, [isAuthenticated, router]);

	const onToggleVisibility = (): void => {
		setIsVisible((prev: boolean) => !prev);
	};

	const registerMutation = useMutation({
		mutationFn: (data: registerPayload): Promise<RegisterResponse> => {
			const req = {
				email: data.email,
				password: data.password,
				phone: data.phone,
				fullName: data.fullName,
			};
			return authService.register(req);
		},
		onSuccess: (data) => {
			const user = {
				username: formData.email,
			};
			login(user);
			router.push('/');
		},
		onError: () => {
			alert('Đăng ký thất bại');
			setFormData((prev) => ({
				...prev,
				password: '',
				retypePassword: '',
			}));
		},
	});
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		if (!formData.email || !formData.password || !formData.retypePassword) {
			alert('Vui lòng điền đầy đủ thông tin');
			return;
		}
		registerMutation.mutate(formData);
	};

	return {
		isVisible,
		onToggleVisibility,
		handleSubmit,
		formData,
		setFormData,
	};
};
