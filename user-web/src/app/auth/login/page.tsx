'use client';

import { JSX, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

import { BaseInputField } from '@/types/uis/BaseInputField';
import SocialLoginButtons from '@/components/auth/social-login-buttons';
import { useAuthHook } from '@/hooks/auth/login/useAuthHook';


const fields: BaseInputField[] = [
	{
		name: 'username',
		label: 'Tên người dùng',
		type: 'text',
		errorMessage: 'Tên người dùng không được để trống',
	},
	{
		name: 'password',
		label: 'Mật khẩu',
		type: 'password',
		errorMessage: 'Mật khẩu không được để trống',
	},
];

export default function LoginPage(): JSX.Element {
	const [isVisible, setIsVisible] = useState(false);

	// Hook trả về các state cực kỳ tinh gọn
	const {
		isLoading,
		loginWithGoogle,
		formdata,
		setFormData,
		handleSubmit
	} = useAuthHook();

	return (
		<div className='min-h-screen flex items-center justify-center bg-slate-100'>
			<div
				className='
          w-full max-w-sm rounded-2xl bg-white p-6
          shadow-md transition-shadow duration-300
          hover:shadow-xl
        '
			>
				<h1 className='mb-6 text-center text-2xl font-semibold text-slate-800'>
					Đăng nhập
				</h1>
				<form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
					{fields.map((field) => (
						<div key={field.name} className='space-y-1'>
							<Label htmlFor={field.name}>{field.label}</Label>
							<div className='relative'>
								<Input
									id={field.name}
									disabled={isLoading} // Disable input khi đang login
									type={field.type === 'password' && isVisible ? 'text' : field.type}
									value={formdata[field.name as keyof typeof formdata]}
									onChange={(e) => setFormData({ ...formdata, [field.name]: e.target.value })}
								/>
								{/* Nút Toggle Eye giữ nguyên */}
							</div>
						</div>
					))}

					<Button
						type='submit'
						disabled={isLoading} // Tự động disabled dựa trên mutation state
						className='mt-4 w-full bg-black text-white'
					>
						{isLoading ? "Đang xử lý..." : "Đăng nhập"}
					</Button>

					<SocialLoginButtons onLoginClick={(provider) => {
						if (provider === 'google') loginWithGoogle();
					}} />
				</form>

			</div>
		</div>
	);
}

