'use client';

import React, { ChangeEvent, JSX, SetStateAction } from 'react';
import { AdminFormWrapper } from '@/components/layout/admin/admin-form-wrapper';
import { Button } from '@/components/ui/button';
import Field from '@/components/layout/admin/field';
import { Input } from '@/components/ui/input';
import { getProductVariantStatusLabel } from '@/types/products/admin/variant/ProductVariantStatusLabel';
import { Label } from '@/components/ui/label';
import { MultiImageUpload } from '@/components/image/admin/multi-image-upload';
import { SortableImageForm } from '@/types/images/admin/SortableImageForm';
import { ProductVariantDetail } from '@/types/products/admin/variant/ProductVariantDetail';
import { calculateDiscount } from '@/utils/shared/calculateDiscount';
import { UseProductVariantLogicReturn } from '@/hooks/products/admin/use-product-variant-logic';

interface ProductVariantDetailUIProps extends UseProductVariantLogicReturn {
	disabled: boolean;
}

export default function ProductVariantDetailUI({
	form,
	disabled,
	loading,
	isView,
	isCreate,
	handleInputChange,
	handleSizeChange,
	handleColorChange,
	handleSalePriceChange,
	handleCostPriceChange,
	handleWeightChange,
	handleLengthChange,
	handleWidthChange,
	handleHeightChange,
	handleImagesChange,
	handleSubmit,
}: ProductVariantDetailUIProps): JSX.Element {
	const discount: number = calculateDiscount(form.pricing.salePrice, form.pricing.costPrice);

	return (
		<AdminFormWrapper
			title='Chi tiết biến thể sản phẩm'
			description='Quản lý thông tin biến thể'
			onSubmit={handleSubmit}
			actions={
				!isView && (
					<Button
						className='cursor-pointer'
						type='submit'
					>
						{isCreate ? 'Tạo biến thể' : 'Cập nhật biến thể'}
					</Button>
				)
			}
		>
			<Field label='Tên biến thể'>
				<Input
					name='name'
					value={form.name}
					onChange={handleInputChange}
					disabled={disabled}
				/>
			</Field>

			<Field label='SKU'>
				<Input
					name='sku'
					value={form.sku}
					onChange={handleInputChange}
					disabled={disabled}
				/>
			</Field>

			<Field label='Nhà cung cấp'>
				<Input
					name='supplierName'
					value={form.supplierName}
					onChange={handleInputChange}
					disabled={disabled}
				/>
			</Field>

			<Field label='Trạng thái'>
				<Input
					value={getProductVariantStatusLabel(form.status)}
					disabled
				/>
			</Field>

			<div className='space-y-2'>
				<Label className='text-lg font-semibold'>Thuộc tính</Label>
				<div className='grid grid-cols-2 gap-4'>
					<Field label='Size'>
						<Input
							value={form.attributes?.[0]?.size || ''}
							onChange={handleSizeChange}
							disabled={disabled}
						/>
					</Field>
					<Field label='Màu sắc'>
						<Input
							value={form.attributes?.[0]?.color || ''}
							onChange={handleColorChange}
							disabled={disabled}
						/>
					</Field>
				</div>
			</div>

			<div className='space-y-2'>
				<Label className='text-lg font-semibold'>Giá</Label>
				<div className='grid grid-cols-2 gap-4'>
					<Field label='Giá bán'>
						<Input
							type='number'
							value={form.pricing.salePrice}
							onChange={handleSalePriceChange}
							disabled={disabled}
						/>
					</Field>
					<Field label='Giá nhập'>
						<Input
							type='number'
							value={form.pricing.costPrice}
							onChange={handleCostPriceChange}
							disabled={disabled}
						/>
					</Field>
					<Field label='Chiết khấu (%)'>
						<div className='relative'>
							<Input
								value={discount}
								disabled
							/>
							<span className='absolute right-3 top-1/2 -translate-y-1/2 text-sm'>
								%
							</span>
						</div>
					</Field>
				</div>
			</div>

			<div className='space-y-2'>
				<Label className='text-lg font-semibold'>Tồn kho</Label>
				<div className='grid grid-cols-3 gap-4'>
					<Field label='Có thể bán'>
						<Input
							value={form.inventory.available}
							disabled
						/>
					</Field>
					<Field label='Đang giữ'>
						<Input
							value={form.inventory.reserved}
							disabled
						/>
					</Field>
					<Field label='Sắp về'>
						<Input
							value={form.inventory.incoming}
							disabled
						/>
					</Field>
				</div>
			</div>

			{form.shipping && (
				<div className='space-y-2'>
					<Label className='text-lg font-semibold'>Vận chuyển</Label>
					<Field label='Khối lượng (gram)'>
						<Input
							type='number'
							value={form.shipping.weightInGram || ''}
							onChange={handleWeightChange}
							disabled={disabled}
						/>
					</Field>
					<div className='grid grid-cols-3 gap-4'>
						<Field label='Dài'>
							<Input
								value={form.shipping.dimensionsInCm?.length || ''}
								onChange={handleLengthChange}
								disabled={disabled}
							/>
						</Field>
						<Field label='Rộng'>
							<Input
								value={form.shipping.dimensionsInCm?.width || ''}
								onChange={handleWidthChange}
								disabled={disabled}
							/>
						</Field>
						<Field label='Cao'>
							<Input
								value={form.shipping.dimensionsInCm?.height || ''}
								onChange={handleHeightChange}
								disabled={disabled}
							/>
						</Field>
					</div>
				</div>
			)}

			<Field label='Hình ảnh'>
				<MultiImageUpload
					value={form.images}
					onChange={handleImagesChange}
					disabled={disabled}
				/>
			</Field>

			{isView && (
				<Button
					variant={'default'}
					type='submit'
					disabled={loading}
					className='cursor-pointer'
				>
					{loading ? 'Đang xử lý...' : isCreate ? 'Tạo biến thể' : 'Cập nhật'}
				</Button>
			)}
		</AdminFormWrapper>
	);
}
