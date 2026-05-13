'use client';

import { JSX, SyntheticEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AvatarUpload } from '@/components/user/user/avatar-upload';
import { ProfileLogicReturn } from '@/hooks/users/profile/use-profile-logic';

interface ProfileUiProps extends ProfileLogicReturn {
	isLoading: boolean;
}

export function ProfileUi({
	formData,
	isSubmitting,
	isLoading,
	handleChange,
	handleSubmit,
}: ProfileUiProps): JSX.Element {
	return (
		<div className='bg-slate-50 p-6'>
			<div className='max-w-4xl mx-auto space-y-6'>
				{/* Header */}
				<div>
					<h1 className='text-2xl font-bold text-slate-800'>
						<strong>Hồ sơ người dùng</strong>
					</h1>
					<p className='text-slate-500 text-sm'>Quản lý thông tin cá nhân của bạn</p>
				</div>

				<Card className='rounded-2xl shadow-sm border border-slate-200'>
					<CardHeader>
						<CardTitle>Thông tin cá nhân</CardTitle>
					</CardHeader>

					<Separator />

					<CardContent className='pt-6 space-y-6'>
						{isLoading ? (
							<div className='py-10 text-center text-slate-500'>
								Đang tải thông tin...
							</div>
						) : (
							<>
								<AvatarUpload />

								{/* Ép kiểu Event chuẩn xác cho Form */}
								<form
									onSubmit={(e: SyntheticEvent<HTMLFormElement>) =>
										handleSubmit(e)
									}
								>
									<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
										<div className='space-y-2'>
											<Label>Họ và tên</Label>
											<Input
												placeholder='Nhập họ và tên'
												value={formData.fullName}
												onChange={(
													e: React.ChangeEvent<HTMLInputElement>,
												) => handleChange('fullName', e.target.value)}
												disabled={isSubmitting}
											/>
										</div>

										<div className='space-y-2'>
											<Label>Email</Label>
											<Input
												type='email'
												placeholder='example@email.com'
												value={formData.email}
												onChange={(
													e: React.ChangeEvent<HTMLInputElement>,
												) => handleChange('email', e.target.value)}
												disabled={isSubmitting}
											/>
										</div>

										<div className='space-y-2'>
											<Label>Số điện thoại</Label>
											<Input
												placeholder='Nhập số điện thoại'
												value={formData.phone}
												onChange={(
													e: React.ChangeEvent<HTMLInputElement>,
												) => handleChange('phone', e.target.value)}
												disabled={isSubmitting}
											/>
										</div>

										<div className='space-y-2'>
											<Label>Địa chỉ 1</Label>
											<Input
												placeholder='Nhập địa chỉ'
												value={formData.address1}
												onChange={(
													e: React.ChangeEvent<HTMLInputElement>,
												) => handleChange('address1', e.target.value)}
												disabled={isSubmitting}
											/>
										</div>

										<div className='space-y-2'>
											<Label>Địa chỉ 2</Label>
											<Input
												placeholder='Nhập địa chỉ'
												value={formData.address2}
												onChange={(
													e: React.ChangeEvent<HTMLInputElement>,
												) => handleChange('address2', e.target.value)}
												disabled={isSubmitting}
											/>
										</div>

										<div className='space-y-2'>
											<Label>Địa chỉ 3</Label>
											<Input
												placeholder='Nhập địa chỉ'
												value={formData.address3}
												onChange={(
													e: React.ChangeEvent<HTMLInputElement>,
												) => handleChange('address3', e.target.value)}
												disabled={isSubmitting}
											/>
										</div>
									</div>

									<div className='flex justify-end'>
										<Button
											type='submit'
											className='bg-slate-800 hover:bg-slate-900 text-white'
											disabled={isSubmitting}
										>
											{isSubmitting ? 'Đang lưu...' : 'Cập nhật thông tin'}
										</Button>
									</div>
								</form>
							</>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
