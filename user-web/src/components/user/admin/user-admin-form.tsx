'use client';

import { ChangeEvent, FormEvent, JSX, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import { getUserRoleLabel, UserRole } from '@/types/users/UserRole';
import Image from 'next/image';
import { formatDate } from '@/utils/shared/date';
import { UserDetailInfoAdmin } from '@/types/users/admin/UserDetailInfoAdmin';
import { AdminFormWrapper } from '@/components/layout/admin/admin-form-wrapper';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

interface Props {
	formType: AdminFormType;
}

const mockUser: UserDetailInfoAdmin = {
	id: 1,
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
	id: 0,
	fullName: '',
	email: '',
	phone: '',
	avatar: '',
	role: 'CUSTOMER',
	status: true,
	createdAt: '',
	updatedAt: '',
};

const roles: UserRole[] = ['ADMIN', 'STAFF', 'CUSTOMER'];

export default function UserAdminForm({ formType }: Props): JSX.Element {
	const isView: boolean = formType === 'view';
	const isCreate: boolean = formType === 'create';

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
	// const handleRoleChange = (e: ChangeEvent<HTMLSelectElement>) => {
	// 	setForm((prev) => ({
	// 		...prev,
	// 		role: e.target.value as UserRole,
	// 	}));
	// };

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		console.log('Submit user:', form);
	};

	return (
		<AdminFormWrapper
			title='Quản lý người dùng'
			description={
				isCreate
					? 'Tạo người dùng mới'
					: isView
						? 'Xem thông tin người dùng'
						: 'Cập nhật thông tin người dùng'
			}
			onSubmit={handleSubmit}
			actions={
				!isView && (
					<Button type='submit'>
						{isCreate ? 'Tạo người dùng' : 'Cập nhật người dùng'}
					</Button>
				)
			}
		>
			{/* Full Name */}
			<div className='space-y-2'>
				<Label>Họ và tên</Label>
				<Input
					name='fullName'
					value={form.fullName}
					onChange={handleInputChange}
					disabled={isView}
				/>
			</div>

			{/* Email */}
			<div className='space-y-2'>
				<Label>Email</Label>
				<Input
					type='email'
					name='email'
					value={form.email}
					onChange={handleInputChange}
					disabled={isView}
				/>
			</div>

			{/* Phone */}
			<div className='space-y-2'>
				<Label>Số điện thoại</Label>
				<Input
					name='phone'
					value={form.phone}
					onChange={handleInputChange}
					disabled={isView}
				/>
			</div>

			{/* Role */}
			<div className='space-y-2'>
				<Label>Vai trò</Label>

				<Select
					value={form.role}
					onValueChange={(value: string) =>
						setForm((prev) => ({
							...prev,
							role: value as UserRole,
						}))
					}
					disabled={isView}
				>
					<SelectTrigger>
						<SelectValue placeholder='Chọn vai trò' />
					</SelectTrigger>

					<SelectContent>
						{roles.map(
							(role: UserRole): JSX.Element => (
								<SelectItem
									key={role}
									value={role}
								>
									{getUserRoleLabel(role)}
								</SelectItem>
							),
						)}
					</SelectContent>
				</Select>
			</div>

			{/* Status */}
			<div className='flex items-center gap-3'>
				<Switch
					checked={form.status}
					onCheckedChange={(checked) => setForm((prev) => ({ ...prev, status: checked }))}
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

			{/* Dates */}
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
		</AdminFormWrapper>
	);
}
