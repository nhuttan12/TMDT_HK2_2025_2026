'use client';

import { ChangeEvent, FormEvent, JSX, SetStateAction } from 'react';
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
import { AdminFormType } from '@/types/shared/admin/AdminFormType';

interface Props {
	form: ProductVariantDetail;
	setForm: React.Dispatch<React.SetStateAction<ProductVariantDetail>>;
	disabled: boolean;
	onSubmit: (e: FormEvent) => void;
	mode: AdminFormType;
	loading: boolean;
}

export default function ProductVariantDetailUI({
	form,
	setForm,
	disabled,
	onSubmit,
	mode,
	loading,
}: Props): JSX.Element {
	const discount: number = calculateDiscount(form.pricing.salePrice, form.pricing.costPrice);

	const isView: boolean = mode === 'view';
	const isCreate: boolean = mode === 'create';
	// const isUpdate: boolean = mode === 'update';

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;

		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<AdminFormWrapper
			title='Chi tiết biến thể sản phẩm'
			description='Quản lý thông tin biến thể'
			onSubmit={onSubmit}
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
			{/* ===== BASIC ===== */}
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

			<Field label='Trạng thái'>
				<Input
					value={getProductVariantStatusLabel(form.status)}
					disabled
				/>
			</Field>

			{/* ===== ATTRIBUTES ===== */}
			<div className='space-y-2'>
				<Label className='text-lg font-semibold'>Thuộc tính</Label>

				<div className='grid grid-cols-2 gap-4'>
					<Field label='Size'>
						<Input
							value={form.attributes?.[0]?.size || ''}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setForm((prev) => ({
									...prev,
									attributes: [{ ...prev.attributes[0], size: e.target.value }],
								}))
							}
							disabled={disabled}
						/>
					</Field>

					<Field label='Màu sắc'>
						<Input
							value={form.attributes?.[0]?.color || ''}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setForm((prev) => ({
									...prev,
									attributes: [{ ...prev.attributes[0], color: e.target.value }],
								}))
							}
							disabled={disabled}
						/>
					</Field>
				</div>
			</div>

			{/* ===== PRICING ===== */}
			<div className='space-y-2'>
				<Label className='text-lg font-semibold'>Giá</Label>

				<div className='grid grid-cols-2 gap-4'>
					<Field label='Giá bán'>
						<Input
							type='number'
							value={form.pricing.salePrice}
							onChange={(e) =>
								setForm((prev) => ({
									...prev,
									pricing: {
										...prev.pricing,
										salePrice: Number(e.target.value),
									},
								}))
							}
							disabled={disabled}
						/>
					</Field>

					<Field label='Giá nhập'>
						<Input
							type='number'
							value={form.pricing.costPrice}
							onChange={(e) =>
								setForm((prev) => ({
									...prev,
									pricing: {
										...prev.pricing,
										costPrice: Number(e.target.value),
									},
								}))
							}
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

			{/* ===== INVENTORY ===== */}
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

			{/* ===== SHIPPING ===== */}
			{form.shipping && (
				<div className='space-y-2'>
					<Label className='text-lg font-semibold'>Vận chuyển</Label>

					<Field label='Khối lượng (gram)'>
						<Input
							type='number'
							value={form.shipping.weightInGram || ''}
							onChange={(e) =>
								setForm((prev) => ({
									...prev,
									shipping: {
										...prev.shipping!,
										weightInGram: Number(e.target.value),
									},
								}))
							}
							disabled={disabled}
						/>
					</Field>

					<div className='grid grid-cols-3 gap-4'>
						<Field label='Dài'>
							<Input
								value={form.shipping.dimensionsInCm?.length || ''}
								onChange={(e) =>
									setForm((prev) => ({
										...prev,
										shipping: {
											...prev.shipping!,
											dimensionsInCm: {
												...prev.shipping!.dimensionsInCm!,
												length: Number(e.target.value),
											},
										},
									}))
								}
								disabled={disabled}
							/>
						</Field>

						<Field label='Rộng'>
							<Input
								value={form.shipping.dimensionsInCm?.width || ''}
								onChange={(e) =>
									setForm((prev) => ({
										...prev,
										shipping: {
											...prev.shipping!,
											dimensionsInCm: {
												...prev.shipping!.dimensionsInCm!,
												width: Number(e.target.value),
											},
										},
									}))
								}
								disabled={disabled}
							/>
						</Field>

						<Field label='Cao'>
							<Input
								value={form.shipping.dimensionsInCm?.height || ''}
								onChange={(e) =>
									setForm((prev) => ({
										...prev,
										shipping: {
											...prev.shipping!,
											dimensionsInCm: {
												...prev.shipping!.dimensionsInCm!,
												height: Number(e.target.value),
											},
										},
									}))
								}
								disabled={disabled}
							/>
						</Field>
					</div>
				</div>
			)}

			{/* ===== IMAGES ===== */}
			<Field label='Hình ảnh'>
				<MultiImageUpload
					value={form.images}
					onChange={(updater: SetStateAction<SortableImageForm[]>): void =>
						setForm((prev: ProductVariantDetail) => ({
							...prev,
							images: typeof updater === 'function' ? updater(prev.images) : updater,
						}))
					}
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
