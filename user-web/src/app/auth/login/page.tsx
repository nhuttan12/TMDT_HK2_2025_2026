'use client';

import { JSX, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

import { BaseInputField } from '@/types/uis/BaseInputField';

const fields: BaseInputField[] = [
	{
		name: 'username',
		label: 'Tài khoản',
		type: 'text',
		errorMessage: 'Tài khoản không được để trống',
	},
	{
		name: 'email',
		label: 'Email',
		type: 'email',
		errorMessage: 'Địa chỉ Email không được để trống',
	},
	{
		name: 'password',
		label: 'Mật khẩu',
		type: 'password',
		errorMessage: 'Mật khẩu không được để trống',
	},
];

export default function Login(): JSX.Element {
	const [isVisible, setIsVisible] = useState(false);

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

				<form className='flex flex-col space-y-4'>
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
										className={`
                                            pr-10
                                            focus-visible:ring-2
                                          focus-visible:ring-black/30
                                        `}
									/>

									{isPassword && (
										<button
											type='button'
											aria-label='toggle password visibility'
											onClick={() => setIsVisible(!isVisible)}
											className='
                                                absolute right-2 top-1/2 -translate-y-1/2
                                                rounded-md p-1 text-slate-500
                                                hover:text-slate-700 hover:bg-slate-100
                                                active:scale-95
                                            '
										>
											{isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
										</button>
									)}
								</div>

								{/* error message (hiện demo) */}
								{/* <p className="text-xs text-red-500">{field.errorMessage}</p> */}
							</div>
						);
					})}

					<Button
						type='submit'
						className='
                            mt-4 w-full bg-black text-white font-semibold
                            hover:bg-black/90 active:bg-black/80
                            active:scale-[0.98]
                            focus-visible:ring-2 focus-visible:ring-black/40
                        '
					>
						Đăng nhập
					</Button>

					<div className='pt-3 text-sm text-slate-600 text-center'>
						Bạn chưa có tài khoản?{' '}
						<Link
							href='/auth/register'
							className='font-medium text-black hover:underline'
						>
							Đăng ký
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
