'use client';

import { ChangeEvent, FormEvent, JSX, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { AdminFormType } from '@/types/products/admin/AdminFormType';
import { ImageFormAdmin } from '@/types/products/admin/ImageFormAdmin';
import { UserRole } from '@/types/users/UserRole';

interface Props {
	formType: AdminFormType;
}

export default function UserAdminForm({ formType }: Props): JSX.Element {
	const FILE_INPUT_ID = 'user-avatar';
	const isView: boolean = formType === 'view';

	const [form, setForm] = useState({
		fullName: '',
		email: '',
		password: '',
		phone: '',
		role: 'CUSTOMER' as UserRole,
		isActive: true,
		avatar: undefined as ImageFormAdmin | undefined,
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

	// ===== AVATAR =====
	const handleAddAvatar = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const avatar: ImageFormAdmin = {
			file,
			preview: URL.createObjectURL(file),
			isPrimary: true,
			order: 0,
		};

		setForm((prev) => ({
			...prev,
			avatar,
		}));

		e.target.value = '';
	};

	const handleRemoveAvatar = () => {
		if (form.avatar?.preview) {
			URL.revokeObjectURL(form.avatar.preview);
		}

		setForm((prev) => ({
			...prev,
			avatar: undefined,
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
						Tạo hoặc chỉnh sửa người dùng trong hệ thống
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

				{/* Password */}
				{formType === 'create' && (
					<div className='space-y-2'>
						<Label htmlFor='password'>Mật khẩu</Label>
						<Input
							id='password'
							name='password'
							type='password'
							value={form.password}
							onChange={handleInputChange}
							disabled={isView}
						/>
					</div>
				)}

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
				{formType !== 'create' && (
					<div className='flex items-center gap-3'>
						<Switch
							checked={form.isActive}
							onCheckedChange={(checked) =>
								setForm((prev) => ({ ...prev, isActive: checked }))
							}
							disabled={isView}
						/>
						<span>Hoạt động</span>
					</div>
				)}

				{/* Avatar */}
				<div className='space-y-4'>
					<div className='flex justify-between items-center'>
						<Label>Avatar</Label>

						<Input
							id={FILE_INPUT_ID}
							type='file'
							accept='image/*'
							className='hidden'
							onChange={handleAddAvatar}
							disabled={isView}
						/>

						<Label
							htmlFor={isView ? undefined : FILE_INPUT_ID}
							className={isView ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
						>
							<Button type='button' asChild disabled={isView}>
								<span>Chọn ảnh</span>
							</Button>
						</Label>
					</div>

					{form.avatar && (
						<div className='mt-4 space-y-3'>
							<img
								src={form.avatar.preview}
								alt=''
								className='w-32 h-32 object-cover rounded-full border'
							/>

							{!isView && (
								<Button
									type='button'
									variant='destructive'
									onClick={handleRemoveAvatar}
								>
									Xoá avatar
								</Button>
							)}
						</div>
					)}
				</div>

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