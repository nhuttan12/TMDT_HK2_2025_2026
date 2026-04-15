'use client';

import React, { JSX } from 'react';
import { BaseImage } from '@/types/images/admin/BaseImage';
import { Button } from '@/components/ui/button';
import { Save, AlertCircle } from 'lucide-react';
import { Popup } from '@/types/shops/Popup';
import SingleImageUpload from '@/components/image/admin/single-image-upload';

interface ShopPopupUiProps {
	popup: Popup | undefined;
	isSubmitting: boolean;
	isValidToSave: boolean;
	errorMsg: string | null;
	onImageChange: (img?: BaseImage) => void;
	onToggleActive: (isActive: boolean) => void;
	onSave: () => void;
}

export function ShopPopupUi(props: ShopPopupUiProps): JSX.Element {
	const { popup, isSubmitting, isValidToSave, errorMsg, onImageChange, onToggleActive, onSave } =
		props;

	return (
		<section className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 mx-auto mt-6'>
			<div className='flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4'>
				<div>
					<h1 className='text-xl font-bold text-gray-800'>Quản lý Popup Khuyến Mãi</h1>
					<p className='text-sm text-gray-500 mt-1'>
						Popup sẽ hiển thị duy nhất 1 hình ảnh ngay khi khách hàng truy cập vào trang chủ.
					</p>
				</div>

				<Button
					onClick={onSave}
					disabled={!isValidToSave || isSubmitting}
					className='min-w-[140px]'
				>
					{isSubmitting ? (
						<span>Đang lưu...</span>
					) : (
						<>
							<Save className='w-4 h-4 mr-2' />
							Lưu thay đổi
						</>
					)}
				</Button>
			</div>

			{errorMsg && (
				<div className='mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-md flex items-center gap-2 border border-red-200'>
					<AlertCircle className='w-5 h-5' />
					{errorMsg}
				</div>
			)}

			<div className='border-gray-300 flex flex-col gap-6'>
				{/* Khu vực bật/tắt Popup */}
				<div className='flex items-center justify-between bg-white p-4 rounded-md border shadow-sm'>
					<div>
						<h3 className='font-medium text-gray-800'>Trạng thái hiển thị</h3>
						<p className='text-sm text-gray-500'>
							Bật để khách hàng nhìn thấy Popup này
						</p>
					</div>
					{/* Giả định bạn có component Switch/Toggle từ shadcn/ui */}
					<label className='flex items-center cursor-pointer'>
						<input
							type='checkbox'
							className='sr-only peer'
							checked={popup?.isActive ?? false}
							onChange={(e) => onToggleActive(e.target.checked)}
							disabled={isSubmitting || !popup}
						/>
						<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 relative"></div>
					</label>
				</div>

				{/* Khu vực Upload */}
				<div className='bg-white rounded-lg border'>
					<SingleImageUpload
						value={popup}
						onChange={onImageChange}
						disabled={isSubmitting}
					/>
				</div>
			</div>
		</section>
	);
}
