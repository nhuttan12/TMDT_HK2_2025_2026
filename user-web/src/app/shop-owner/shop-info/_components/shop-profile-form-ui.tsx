'use client';

import SingleImageUpload from '@/components/images/admin/single-image-upload';
import { AdminFormWrapper } from '@/components/layout/admin/admin-form-wrapper';
import Field from '@/components/layout/admin/field';
import RichTextEditor from '@/components/layout/admin/rich-text-editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UseShopProfileLogicReturn } from '@/hooks/shops/admin/use-shop-profile-logic';
import React, { JSX } from 'react';

type ShopProfileFormUiProps = UseShopProfileLogicReturn;

export default function ShopProfileFormUi({
	form,
	loading,
	isView,
	isCreate,
	isUpdate,
	isDisabled,
	logoFile,
	handleInputChange: onInputChange,
	handleDescriptionChange: onDescriptionChange,
	handleLogoChange: onLogoChange,
	handleSubmit: onSubmit,
	handleEditClick: onEditClick,
	handleCancel: onCancel,
}: ShopProfileFormUiProps): JSX.Element {
	return (
		<AdminFormWrapper
			title='Thiết lập Cửa hàng'
			description='Quản lý thông tin hiển thị, địa chỉ kho và cấu hình thanh toán.'
			onSubmit={onSubmit}
			actions={
				<div className='flex items-center gap-4 mt-4'>
					{/* 1. Trạng thái VIEW: Nút Điều chỉnh */}
					{isView && (
						<Button
							type='button'
							onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
								e.preventDefault();
								onEditClick();
							}}
							className='cursor-pointer min-w-30'
						>
							Điều chỉnh thông tin cửa hàng
						</Button>
					)}

					{/* 2. Trạng thái UPDATE: Nút Hủy và Nút Lưu */}
					{isUpdate && (
						<>
							<Button
								type='button'
								variant='outline'
								onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
									e.preventDefault();
									onCancel();
								}}
								disabled={loading}
								className='cursor-pointer min-w-30'
							>
								Hủy
							</Button>
							<Button
								type='submit'
								disabled={loading}
								className='cursor-pointer min-w-30'
							>
								{loading ? 'Đang xử lý...' : 'Lưu thay đổi'}
							</Button>
						</>
					)}

					{/* 3. Trạng thái CREATE: Nút Hoàn tất */}
					{isCreate && (
						<Button
							type='submit'
							disabled={loading}
							className='cursor-pointer min-w-30'
						>
							{loading ? 'Đang xử lý...' : 'Hoàn tất thiết lập'}
						</Button>
					)}
				</div>
			}
		>
			<Field label='Tên cửa hàng'>
				<Input
					name='name'
					placeholder='VD: Terrarium VN'
					value={form.name}
					onChange={onInputChange}
					disabled={isDisabled}
				/>
			</Field>

			<div className='grid grid-cols-2 gap-4'>
				<Field label='Email hỗ trợ'>
					<Input
						name='email'
						type='email'
						placeholder='cskh@cuahang.com'
						value={form.email}
						onChange={onInputChange}
						disabled={isDisabled}
					/>
				</Field>

				<Field label='Hotline CSKH'>
					<Input
						name='phone'
						type='tel'
						placeholder='0909xxxxxx'
						value={form.phone}
						onChange={onInputChange}
						disabled={isDisabled}
					/>
				</Field>
			</div>

			<Field label='Mô tả cửa hàng (Giới thiệu)'>
				<RichTextEditor
					value={form.description}
					onChange={onDescriptionChange}
					disabled={isDisabled}
				/>
			</Field>

			{/* KHU VỰC LOGO */}
			<Field label='Logo cửa hàng (Tỷ lệ 1:1)'>
				<SingleImageUpload
					value={{ imageUrl: form.logoUrl, file: logoFile }}
					onChange={onLogoChange}
					disabled={isDisabled}
				/>
			</Field>

			<Field label='Địa chỉ chi tiết (Dùng làm địa chỉ lấy hàng mặc định)'>
				<Input
					name='address'
					placeholder='VD: 123 Đường ABC, Phường X, Quận Y, TPHCM'
					value={form.address}
					onChange={onInputChange}
					disabled={isDisabled}
				/>
			</Field>

			<Field label='Tiêu đề SEO (Hiển thị trên Google)'>
				<Input
					name='seoTitle'
					placeholder='VD: Terrarium VN - Rừng cây trong bể kính'
					value={form.seoTitle}
					onChange={onInputChange}
					disabled={isDisabled}
				/>
			</Field>

			<Field label='Mô tả SEO (Meta Description)'>
				<Input
					name='metaDescription'
					placeholder='Nhập mô tả ngắn gọn giúp tối ưu tìm kiếm...'
					value={form.metaDescription}
					onChange={onInputChange}
					disabled={isDisabled}
				/>
			</Field>

			<div className='grid grid-cols-2 gap-4'>
				<Field label='Tên Ngân hàng'>
					<Input
						name='bankName'
						placeholder='VD: Vietcombank'
						value={form.bankName}
						onChange={onInputChange}
						disabled={isDisabled}
					/>
				</Field>

				<Field label='Tên Chủ Tài Khoản'>
					<Input
						name='accountName'
						placeholder='VD: NGUYEN VAN A'
						value={form.accountName}
						onChange={onInputChange}
						disabled={isDisabled}
					/>
				</Field>
			</div>

			<div className='w-1/2 pr-2'>
				<Field label='Số Tài Khoản'>
					<Input
						name='accountNumber'
						placeholder='Nhập số tài khoản hợp lệ'
						value={form.accountNumber}
						onChange={onInputChange}
						disabled={isDisabled}
					/>
				</Field>
			</div>
		</AdminFormWrapper>
	);
}
