'use client';

import { JSX } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AvatarUpload } from '@/components/user/avatar-upload';

export default function ProfilePage(): JSX.Element {
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
						{/* Avatar */}
						<AvatarUpload />

						{/* Form */}
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<div className='space-y-2'>
								<Label>Họ và tên</Label>
								<Input placeholder='Nhập họ và tên' />
							</div>

							<div className='space-y-2'>
								<Label>Email</Label>
								<Input
									type='email'
									placeholder='example@email.com'
								/>
							</div>

							<div className='space-y-2'>
								<Label>Số điện thoại</Label>
								<Input placeholder='Nhập số điện thoại' />
							</div>

							<div className='space-y-2'>
								<Label>Địa chỉ 1</Label>
								<Input placeholder='Nhập địa chỉ' />
							</div>

							<div className='space-y-2'>
								<Label>Địa chỉ 2</Label>
								<Input placeholder='Nhập địa chỉ' />
							</div>

							<div className='space-y-2'>
								<Label>Địa chỉ 3</Label>
								<Input placeholder='Nhập địa chỉ' />
							</div>
						</div>

						{/* Action */}
						<div className='flex justify-end'>
							<Button className='bg-slate-800 hover:bg-slate-900 text-white'>
								Cập nhật thông tin
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
