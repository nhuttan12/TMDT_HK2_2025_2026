'use client';

import React, { JSX } from 'react';
import { AdminFormWrapper } from '@/components/layout/admin/admin-form-wrapper';
import Field from '@/components/layout/admin/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { CouponFormLogicReturn } from '@/hooks/marketing/coupons/admin/use-coupon-form-logic';
import { CouponScope } from '@/types/marketing/coupons/CouponScope';
import { CouponStatus } from '@/types/marketing/coupons/CouponStatus';
import { DiscountType } from '@/types/marketing/coupons/DiscountType';
import { formatForDateTimeInput } from '@/utils/shared/date';

type CouponFormUiProps = CouponFormLogicReturn;

export const CouponFormUi = ({
	formData,
	isLoading,
	handleInputChange,
	handleTimeChange,
	handleSubmit,
	isView,
	isUpdating,
	isCreating,
}: CouponFormUiProps): JSX.Element => {
	const actions: JSX.Element = (
		<div className='flex justify-end gap-3 mt-6 pt-6 border-t'>
			{isCreating && (
				<>
					<Button
						type='button'
						variant='outline'
					>
						Hủy bỏ
					</Button>
					<Button
						type='submit'
						disabled={isLoading}
					>
						{isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
					</Button>
				</>
			)}
		</div>
	);

	return (
		<AdminFormWrapper
			title='Chỉnh sửa Coupon'
			description='Cập nhật thông tin chi tiết, điều kiện và thời gian áp dụng của mã giảm giá.'
			onSubmit={handleSubmit}
			actions={actions}
		>
			{/* 1. Thông tin cơ bản */}
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				<Field label='Mã Coupon'>
					<Input
						value={formData.code}
						onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
							handleInputChange('code', e.target.value)
						}
						disabled={isView || isUpdating}
					/>
				</Field>

				<Field label='Tên hiển thị'>
					<Input
						value={formData.name}
						onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
							handleInputChange('name', e.target.value)
						}
						disabled={isView}
					/>
				</Field>

				<Field label='Phạm vi (Scope)'>
					<Select
						value={formData.scope}
						onValueChange={(val: CouponScope): void => handleInputChange('scope', val)}
						disabled={isView}
					>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='platform'>Toàn sàn (Platform)</SelectItem>
							<SelectItem value='shop'>Của Shop</SelectItem>
						</SelectContent>
					</Select>
				</Field>

				<Field label='Trạng thái'>
					<Select
						value={formData.status}
						onValueChange={(val: CouponStatus): void =>
							handleInputChange('status', val)
						}
						disabled={isView}
					>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='upcoming'>Sắp diễn ra</SelectItem>
							<SelectItem value='active'>Đang hoạt động</SelectItem>
							<SelectItem value='expired'>Đã hết hạn</SelectItem>
							<SelectItem value='disabled'>Vô hiệu hóa</SelectItem>
						</SelectContent>
					</Select>
				</Field>
			</div>

			<div className='border-t my-6'></div>

			{/* 2. Cấu hình giảm giá */}
			<h3 className='font-semibold text-lg mb-4'>Cấu hình giảm giá</h3>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				<Field label='Loại giảm giá'>
					<Select
						value={formData.discountType}
						onValueChange={(val: DiscountType): void =>
							handleInputChange('discountType', val)
						}
						disabled={isView}
					>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='fixed_amount'>Số tiền cố định (VNĐ)</SelectItem>
							<SelectItem value='percentage'>Phần trăm (%)</SelectItem>
						</SelectContent>
					</Select>
				</Field>

				<Field label='Mức giảm'>
					<Input
						type='number'
						value={formData.discountValue}
						onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
							handleInputChange('discountValue', Number(e.target.value))
						}
						disabled={isView}
					/>
				</Field>

				<Field label='Giá trị đơn hàng tối thiểu'>
					<Input
						type='number'
						value={formData.minOrderValue}
						onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
							handleInputChange('minOrderValue', Number(e.target.value))
						}
						disabled={isView}
					/>
				</Field>

				<Field label='Mức giảm tối đa (Tùy chọn)'>
					<Input
						type='number'
						value={formData.maxDiscountAmount || ''}
						onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
							const val = e.target.value;
							handleInputChange('maxDiscountAmount', val ? Number(val) : null);
						}}
						placeholder='Để trống nếu không giới hạn'
						disabled={isView || formData.discountType === 'fixed_amount'} // Fixed thì không cần mức giảm tối đa
					/>
				</Field>
			</div>

			<div className='border-t my-6'></div>

			{/* 3. Thời gian và Số lượng */}
			<h3 className='font-semibold text-lg mb-4'>Thời gian & Số lượng</h3>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				<Field label='Thời gian bắt đầu'>
					<Input
						type='datetime-local'
						value={formatForDateTimeInput(formData.validTime.fromDate)}
						onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
							handleTimeChange('fromDate', new Date(e.target.value).toISOString())
						}
						disabled={isView}
					/>
				</Field>

				<Field label='Thời gian kết thúc'>
					<Input
						type='datetime-local'
						value={formatForDateTimeInput(formData.validTime.toDate)}
						onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
							handleTimeChange('toDate', new Date(e.target.value).toISOString())
						}
						disabled={isView}
					/>
				</Field>

				<Field label='Tổng số lượng phát hành'>
					<Input
						type='number'
						value={formData.totalQuantity}
						onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
							handleInputChange('totalQuantity', Number(e.target.value))
						}
						disabled={isView}
					/>
				</Field>

				<Field label='Đã sử dụng (Hệ thống tự đếm)'>
					<Input
						type='number'
						value={formData.usedQuantity}
						disabled
						className='bg-gray-100 text-gray-500 cursor-not-allowed'
					/>
				</Field>
			</div>
		</AdminFormWrapper>
	);
};
