'use client';

import { JSX } from 'react';
import { BaseInputField } from '@/types/uis/BaseInputField';
import { RegisterFormUI } from '@/app/(auth)/register/_component/register-ui';
import { useRegisterLogic } from '@/hooks/auth/register/use-register-logic';

const fields: BaseInputField[] = [
	{
		name: 'email',
		label: 'Email',
		type: 'email',
		errorMessage: 'Địa chỉ Email không được để trống',
	},
	{
		name: 'phone',
		label: 'Phone',
		type: 'text',
		errorMessage: 'phone không được để trống',
	},
	{
		name: 'fullName',
		label: 'FullName',
		type: 'text',
		errorMessage: 'phone không được để trống',
	},
	{
		name: 'password',
		label: 'Mật khẩu',
		type: 'password',
		errorMessage: 'Mật khẩu không được để trống',
	},
	{
		name: 'retypePassword',
		label: 'Nhập lại mật khẩu',
		type: 'password',
		errorMessage: 'Nhập lại mật khẩu không được khác mật khẩu',
	},
];

export default function RegisterContainer(): JSX.Element {
	const logic = useRegisterLogic();
	const handleInputChange = (name: string, value: string): void => {
		logic.setFormData({ ...logic.formData, [name]: value });
	};

	return (
		<RegisterFormUI
			fields={fields}
			onInputChange={handleInputChange}
			{...logic}
		/>
	);
}
