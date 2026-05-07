'use client';

import React, { JSX } from 'react';
import { SortableImageForm } from '@/types/images/admin/SortableImageForm';
import { MultiImageUpload } from '@/components/image/admin/multi-image-upload';
import { Button } from '@/components/ui/button';
import { Save, AlertCircle } from 'lucide-react';

interface ShopBannersUIProps {
	images: SortableImageForm[];
	setImages: React.Dispatch<React.SetStateAction<SortableImageForm[]>>;
	isSubmitting: boolean;
	hasPrimary: boolean;
	isValidToSave: boolean;
	errorMsg: string | null;
	onSave: () => void;

	// Custom Text Content (Tham số hóa Text)
	title: string;
	description: string;
	missingPrimaryWarning?: string;

	// Field cho phép tùy chỉnh chiều rộng/cao, cho phép nullable
	imageWidth?: number | null;
	imageHeight?: number | null;
}

export function ShopBannersUi({
	images,
	setImages,
	isSubmitting,
	hasPrimary,
	isValidToSave,
	errorMsg,
	onSave,
	title,
	description,
	missingPrimaryWarning,
}: ShopBannersUIProps): JSX.Element {
	return (
		<section className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
			<div className='flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4'>
				<div>
					{/* Sử dụng biến thay vì text cứng */}
					<h1 className='text-xl font-bold text-gray-800'>{title}</h1>
					<p className='text-sm text-gray-500 mt-1'>{description}</p>
				</div>

				<Button
					onClick={onSave}
					disabled={!isValidToSave || isSubmitting}
					className='min-w-35'
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

			{/* Render cảnh báo linh hoạt */}
			{missingPrimaryWarning && !hasPrimary && images.length > 0 && (
				<div className='mb-4 p-3 bg-yellow-50 text-yellow-700 text-sm rounded-md flex items-center gap-2 border border-yellow-200'>
					<AlertCircle className='w-5 h-5' />
					{missingPrimaryWarning}
				</div>
			)}

			<div className='bg-gray-50 p-6 rounded-lg border border-dashed border-gray-300'>
				<MultiImageUpload
					value={images}
					onChange={setImages}
					disabled={isSubmitting}
                    width={850}
                    height={300}
				/>
			</div>
		</section>
	);
}
