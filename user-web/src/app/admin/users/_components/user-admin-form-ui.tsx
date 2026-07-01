import Image from 'next/image';
import { JSX } from 'react';

import { AdminFormWrapper } from '@/components/layout/admin/admin-form-wrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { UseUserAdminFormLogicReturn } from '@/hooks/users/admin/use-user-admin-form-logic';
import { formatDate } from '@/utils/shared/date';

// Kế thừa toàn bộ logic hook return
type UserAdminFormUiProps = UseUserAdminFormLogicReturn;

export default function UserAdminFormUi({
	form,
	isView,
	isCreate,
	handleInputChange,
	handleSubmit,
}: UserAdminFormUiProps): JSX.Element {
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
			<div className='space-y-2'>
				<Label>Họ và tên</Label>
				<Input
					name='fullName'
					value={form.fullName || ''}
					onChange={handleInputChange}
					disabled={isView}
				/>
			</div>

			<div className='space-y-2'>
				<Label>Email</Label>
				<Input
					type='email'
					name='email'
					value={form.email || ''}
					onChange={handleInputChange}
					disabled={isView}
				/>
			</div>

			<div className='space-y-2'>
				<Label>Số điện thoại</Label>
				<Input
					name='phone'
					value={form.phone || ''}
					onChange={handleInputChange}
					disabled={isView}
				/>
			</div>

			{form.avatar && (
				<div className='space-y-2'>
					<Label>Avatar</Label>
					<div className='relative w-32 h-32 rounded-full overflow-hidden border'>
						<Image
							src={
								form.avatar ||
								'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'
							}
							alt={form.fullName}
							fill
							className='object-cover'
						/>
					</div>
				</div>
			)}

			{!isCreate && (
				<div className='grid grid-cols-2 gap-4 text-sm text-muted-foreground'>
					<div>
						<p className='font-medium text-black'>Ngày tạo</p>
						<Input
							name='phone'
							value={formatDate(form.createdAt || '')}
							disabled
						/>
					</div>
					<div>
						<p className='font-medium text-black'>Cập nhật lần cuối</p>
						<Input
							name='phone'
							value={formatDate(form.updatedAt || '')}
							disabled
						/>
					</div>
				</div>
			)}
		</AdminFormWrapper>
	);
}
