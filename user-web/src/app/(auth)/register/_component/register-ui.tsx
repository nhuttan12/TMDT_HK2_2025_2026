'use client';

import { JSX } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { BaseInputField } from '@/types/uis/BaseInputField';
import { RegisterReturn } from '@/hooks/auth/register/use-register-logic';

export interface RegisterUIProps extends RegisterReturn {
	fields: BaseInputField[];
	isVisible: boolean;
	onToggleVisibility: () => void;
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	onInputChange: (name: string, value: string) => void;
}
export function RegisterFormUI(props: RegisterUIProps): JSX.Element {
	const { fields, isVisible, onToggleVisibility, handleSubmit, onInputChange,formData } = props;

	return (
		<div className='min-h-screen flex items-center justify-center bg-slate-100'>
			<div
				className={cn(
					'w-full max-w-sm rounded-2xl bg-white p-6',
					'shadow-md transition-shadow duration-300',
					'hover:shadow-xl',
				)}
			>
				<h1 className='mb-6 text-center text-2xl font-semibold text-slate-800'>Đăng ký</h1>
				<form
					onSubmit={handleSubmit}
					className='flex flex-col space-y-4'
				>
					{fields.map((field) => {
						const isPassword = field.type === 'password';

						return (
							<div
								key={field.name}
								className='space-y-1'
							>
								<Label
									htmlFor={field.name}
									className='text-slate-600 font-medium'
								>
									{field.label}
								</Label>

								<div className='relative'>
									<Input
										id={field.name}
										name={field.name}
										type={
											isPassword
												? isVisible
													? 'text'
													: 'password'
												: field.type
										}
										required
										className='pr-10 focus-visible:ring-2 focus-visible:ring-black/30'
										onChange={(e)=> onInputChange(field.name, e.target.value)}
										value={formData[field.name] || ''}
									/>

									{isPassword && (
										<button
											type='button'
											aria-label='toggle password visibility'
											onClick={onToggleVisibility}
											className='absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 hover:text-slate-700 hover:bg-slate-100 active:scale-95'
										>
											{isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
										</button>
									)}
								</div>
							</div>
						);
					})}

					<Button
						type='submit'
						className='mt-4 w-full bg-black text-white font-semibold hover:bg-black/90 active:bg-black/80 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-black/40'
					>
						Đăng ký
					</Button>

					<div className='pt-3 text-sm text-slate-600 text-center'>
						Bạn đã có tài khoản?{' '}
						<Link
							href='/login'
							className='font-medium text-black hover:underline'
						>
							Đăng nhập
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
