'use client';

import { JSX, useState } from 'react';
import { BaseInputField } from '@/types/uis/BaseInputField';
import { LoginUI } from './login-ui';
import { LoginReturn, useLoginLogic } from '../../../../hooks/auth/login/use-login-logic';

const FIELDS: BaseInputField[] = [
	{ name: 'email', label: 'Email', type: 'email', errorMessage: 'Email không hợp lệ' },
	{ name: 'password', label: 'Mật khẩu', type: 'password', errorMessage: 'Mật khẩu trống' },
];


export function LoginContainer(): JSX.Element {
	const [isVisible, setIsVisible] = useState(false);
	const logic: LoginReturn = useLoginLogic();

	const toggleVisibility = (): void => {
		setIsVisible(!isVisible);
	};

	const handleInputChange = (name: string, value: string): void => {
		logic.setFormData({ ...logic.formData, [name]: value });
	};

	return (
		<LoginUI
			fields={FIELDS}
			isVisible={isVisible}
			toggleVisibility={toggleVisibility}
			onInputChange={handleInputChange}
			{...logic}
		/>
	);
}
