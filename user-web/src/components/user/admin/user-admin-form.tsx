'use client';

import { ChangeEvent, FormEvent, JSX, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import { UserRole } from '@/types/users/UserRole';
import Image from 'next/image';
import { formatDate } from '@/utils/date';
import { UserDetailInfoAdmin } from '@/types/users/admin/UserDetailInfoAdmin';

interface Props {
	formType: AdminFormType;
}

const mockUser: UserDetailInfoAdmin = {
	userID: 1,
	fullName: 'Nguyễn Văn A',
	email: 'nguyenvana@example.com',
	phone: '0901234567',
	avatar: 'https://i.pravatar.cc/300',
	role: 'STAFF',
	status: true,
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
};

const emptyUser: UserDetailInfoAdmin = {
	userID: 0,
	fullName: '',
	email: '',
	phone: '',
	avatar: '',
	role: 'CUSTOMER',
	status: true,
	createdAt: '',
	updatedAt: '',
};

export default function UserAdminForm({ formType }: Props): JSX.Element {
	const isView: boolean = formType === 'view';

	const [form, setForm] = useState<UserDetailInfoAdmin>((): UserDetailInfoAdmin => {
		if (isView) return mockUser;
		return emptyUser;
	});

	// ===== TEXT INPUT =====
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// ===== ROLE CHANGE =====
	const handleRoleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setForm((prev) => ({
			...prev,
			role: e.target.value as UserRole,
		}));
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		console.log('Submit user:', form);
	};

	return (
		<>
			<div className='flex justify-between items-center'>
				<div>
					<h1 className='text-2xl font-bold'>Quản lý người dùng</h1>
					<p className='text-sm text-muted-foreground'>
						{formType === 'create'
							? 'Tạo người dùng mới'
							: formType === 'update'
								? 'Cập nhật thông tin người dùng'
								: 'Xem thông tin người dùng'}
					</p>
				</div>
			</div>

			<form
				onSubmit={handleSubmit}
				className='space-y-6 w-full max-w-3xl mx-auto mt-5 shadow-xl p-7 rounded-2xl border'
			>
				{/* Full Name */}
				<div className='space-y-2'>
					<Label htmlFor='fullName'>Họ và tên</Label>
					<Input
						id='fullName'
						name='fullName'
						value={form.fullName}
						onChange={handleInputChange}
						disabled={isView}
					/>
				</div>

				{/* Email */}
				<div className='space-y-2'>
					<Label htmlFor='email'>Email</Label>
					<Input
						id='email'
						name='email'
						type='email'
						value={form.email}
						onChange={handleInputChange}
						disabled={isView}
					/>
				</div>

				{/* Phone */}
				<div className='space-y-2'>
					<Label htmlFor='phone'>Số điện thoại</Label>
					<Input
						id='phone'
						name='phone'
						value={form.phone}
						onChange={handleInputChange}
						disabled={isView}
					/>
				</div>

				{/* Role */}
				<div className='space-y-2'>
					<Label>Vai trò</Label>
					<select
						value={form.role}
						onChange={handleRoleChange}
						disabled={isView}
						className='border rounded-md p-2 w-full'
					>
						<option value='ADMIN'>Quản trị viên</option>
						<option value='STAFF'>Nhân viên</option>
						<option value='CUSTOMER'>Khách hàng</option>
					</select>
				</div>

				{/* Active */}
				<div className='flex items-center gap-3'>
					<Switch
						checked={form.status}
						onCheckedChange={(checked) =>
							setForm((prev) => ({ ...prev, status: checked }))
						}
						disabled={isView}
					/>
					<span>Hoạt động</span>
				</div>

				{/* Avatar */}
				{form.avatar && (
					<div className='space-y-2'>
						<Label>Avatar</Label>
						<div className='relative w-32 h-32 rounded-full overflow-hidden border'>
							<Image
								src={form.avatar}
								alt={form.fullName}
								fill
								className='object-cover'
							/>
						</div>
					</div>
				)}

				{/* Created / Updated (view only) */}
				{formType !== 'create' && (
					<div className='grid grid-cols-2 gap-4 text-sm text-muted-foreground'>
						<div>
							<p className='font-medium text-black'>Ngày tạo</p>
							<p>{formatDate(form.createdAt)}</p>
						</div>

						<div>
							<p className='font-medium text-black'>Cập nhật lần cuối</p>
							<p>{formatDate(form.updatedAt)}</p>
						</div>
					</div>
				)}

				{/* Submit */}
				{!isView && (
					<Button type='submit'>
						{formType === 'create' ? 'Tạo người dùng' : 'Cập nhật người dùng'}
					</Button>
				)}
			</form>
		</>
	);
}
