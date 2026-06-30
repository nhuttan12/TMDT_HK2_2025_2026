'use client';

import { AdminFormWrapper } from '@/components/layout/admin/admin-form-wrapper';
import { Button } from '@/components/ui/button';
import Field from '@/components/layout/admin/field';
import { Input } from '@/components/ui/input';
import { JSX } from 'react';
import { UseSupplierFormLogicReturn } from '@/hooks/inventories/suppliers/use-supplier-form-logic';

type SupplierFormUiProps = UseSupplierFormLogicReturn;

export default function SupplierFormUi({
	form,
	isView,
	isCreate,
	isSubmitting,
	handleNameChange,
	handleTaxCodeChange,
	handleContactNameChange,
	handlePhoneChange,
	handleEmailChange,
	handleAddressChange,
	onFormSubmit,
	handleBack,
}: SupplierFormUiProps): JSX.Element {
	return (
		<AdminFormWrapper
			title={
				isCreate
					? 'Thêm mới nhà cung cấp'
					: isView
						? 'Chi tiết nhà cung cấp'
						: 'Cập nhật nhà cung cấp'
			}
			description='Quản lý thông tin đối tác cung cấp hàng hóa và dịch vụ'
			onSubmit={onFormSubmit}
			actions={
				<div className='flex gap-3'>
					<Button
						type='button'
						variant='outline'
						disabled={isSubmitting}
						onClick={(): void => handleBack()}
						className='cursor-pointer'
					>
						{isView ? 'Quay lại' : 'Hủy bỏ'}
					</Button>
					{!isView && (
						<Button
							type='submit'
							disabled={isSubmitting}
							className='cursor-pointer'
						>
							{isSubmitting ? 'Đang lưu...' : isCreate ? 'Thêm mới' : 'Cập nhật'}
						</Button>
					)}
				</div>
			}
		>
			<div className='grid grid-cols-2 gap-6 p-6 rounded-xl border bg-card shadow-sm'>
				{/* Tên nhà cung cấp */}
				<Field label='Tên nhà cung cấp *'>
					<Input
						value={form.name}
						disabled={isView}
						onChange={handleNameChange}
						placeholder='Nhập tên công ty/nhà cung cấp...'
					/>
				</Field>

				{/* Mã số thuế */}
				<Field label='Mã số thuế *'>
					<Input
						value={form.taxCode}
						disabled={isView}
						className='font-mono'
						onChange={handleTaxCodeChange}
						placeholder='Ví dụ: 0101234567'
					/>
				</Field>

				{/* Người liên hệ */}
				<Field label='Người liên hệ'>
					<Input
						value={form.contactName || ''}
						disabled={isView}
						onChange={handleContactNameChange}
						placeholder='Nhập tên người đại diện...'
					/>
				</Field>

				{/* Số điện thoại */}
				<Field label='Số điện thoại'>
					<Input
						value={form.phone || ''}
						disabled={isView}
						onChange={handlePhoneChange}
						placeholder='Nhập số điện thoại liên hệ...'
					/>
				</Field>

				{/* Email */}
				<Field label='Email liên hệ'>
					<Input
						type='email'
						value={form.email || ''}
						disabled={isView}
						onChange={handleEmailChange}
						placeholder='Ví dụ: contact@supplier.com'
					/>
				</Field>

				{/* Địa chỉ (Chiếm 2 cột vì thường rất dài) */}
				<Field
					label='Địa chỉ chi tiết *'
					className='col-span-2'
				>
					<Input
						value={form.address}
						disabled={isView}
						onChange={handleAddressChange}
						placeholder='Nhập số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố...'
					/>
				</Field>
			</div>
		</AdminFormWrapper>
	);
}
