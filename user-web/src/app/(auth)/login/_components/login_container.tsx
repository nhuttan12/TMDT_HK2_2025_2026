'use client';

import { JSX, useState } from 'react';
import { BaseInputField } from '@/types/uis/BaseInputField';
import { LoginUI } from '@/app/(auth)/login/_components/login_ui';
import {useLoginLogic} from "@/hooks/auth/login/useLoginLogic";

const FIELDS: BaseInputField[] = [
	{ name: 'email', label: 'Email', type: 'email', errorMessage: 'Email không hợp lệ' },
	{ name: 'password', label: 'Mật khẩu', type: 'password', errorMessage: 'Mật khẩu trống' },
];


export function LoginContainer(): JSX.Element {
	const [isVisible, setIsVisible] = useState(false);
	const { isLoading, loginWithGoogle, formData, setFormData, handleSubmit } = useLoginLogic();

	const handleInputChange = (name: string, value: string): void => {
		setFormData({ ...formData, [name]: value });
	};

	return (
		<LoginUI
			fields={FIELDS}
			formData={formData}
			isLoading={isLoading}
			isVisible={isVisible}
			toggleVisibility={() => setIsVisible(!isVisible)}
			onInputChange={handleInputChange}
			onSubmit={handleSubmit}
			onGoogleLogin={loginWithGoogle}
		/>
	);
}
