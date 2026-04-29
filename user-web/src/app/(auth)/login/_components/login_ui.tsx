// components/auth/login-ui.tsx
'use client';

import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SocialLoginButtons from '@/components/auth/social-login-buttons';
import { cn } from '@/lib/utils';
import { BaseInputField } from '@/types/uis/BaseInputField';
import React from 'react';
import {LoginPayload} from "@/services/auth/authService";



interface LoginUIProps {
	fields: BaseInputField[];
	formData: LoginPayload;
	isLoading: boolean;
	isVisible: boolean;
	toggleVisibility: () => void;
	onInputChange: (name: string, value: string) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	onGoogleLogin: () => void;
}

export function LoginUI({
	fields,
	formData,
	isLoading,
	isVisible,
	toggleVisibility,
	onInputChange,
	onSubmit,
	onGoogleLogin,
}: LoginUIProps) {
	return (
		<div className='min-h-screen flex items-center justify-center bg-slate-100'>
			<div
				className={cn(
					'w-full max-w-sm rounded-2xl bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-xl',
				)}
			>
				<h1 className='mb-6 text-center text-2xl font-semibold text-slate-800'>
					Đăng nhập
				</h1>

				<form
					onSubmit={onSubmit}
					className='flex flex-col space-y-4'
				>
					{fields.map((field) => (
						<div
							key={field.name}
							className='space-y-1'
						>
							<Label htmlFor={field.name}>{field.label}</Label>
							<div className='relative'>
								<Input
									id={field.name}
									disabled={isLoading}
									type={
										field.type === 'password' && isVisible ? 'text' : field.type
									}
									value={formData[field.name] || ''}
									onChange={(e) => onInputChange(field.name, e.target.value)}
								/>
								{field.type === 'password' && (
									<button
										type='button'
										onClick={toggleVisibility}
										className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-500'
									>
										{isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
									</button>
								)}
							</div>
						</div>
					))}

					<Button
						type='submit'
						disabled={isLoading}
						className='mt-4 w-full bg-black text-white'
					>
						{isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
					</Button>

					<SocialLoginButtons onLoginClick={(p) => p === 'google' && onGoogleLogin()} />
				</form>
			</div>
		</div>
	);
}
