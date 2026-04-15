'use client';

import { Label } from '@/components/ui/label';
import { BaseImage } from '@/types/images/admin/BaseImage';
import { ChangeEvent, JSX, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getImageSrc } from '@/utils/images/getImageSrc';
import Image from 'next/image';
import { ImagePlus, Trash2 } from 'lucide-react';

interface Props {
	value?: BaseImage;
	onChange: (img?: BaseImage) => void;
	disabled?: boolean;
}

export default function SingleImageUpload({ value, onChange, disabled }: Props): JSX.Element {
	const FILE_INPUT_ID = 'single-image-upload';

	// 1. State NÀY CHỈ LƯU URL tạm thời sinh ra từ File (Blob URL)
	const [objectUrl, setObjectUrl] = useState<string | null>(null);

	// 2. Tính toán Derived State ngay lúc Render (Không tốn thêm vòng lặp render nào)
	const previewUrl: string | null = value?.file ? objectUrl : value?.imageUrl || null;

	// 3. Effect BÂY GIỜ CHỈ LO VIỆC CẤP PHÁT/THU HỒI BỘ NHỚ (External System)
	useEffect((): (() => void) | void => {
		if (!value?.file) {
			// Nếu không có file (người dùng chưa chọn hoặc đã xóa),
			// ta không làm gì cả, cũng KHÔNG GỌI setState ở đây.
			return;
		}

		// Chỉ chạy logic khi thực sự có File Object cần tạo Blob URL
		const url: string = URL.createObjectURL(value.file);
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setObjectUrl(url);

		return (): void => {
			URL.revokeObjectURL(url);
		};
	}, [value?.file]); // Dependency chỉ quan tâm đến file, không quan tâm toàn bộ object value

	const handleAdd = (e: ChangeEvent<HTMLInputElement>): void => {
		const file: File | undefined = e.target.files?.[0];
		if (!file) return;

		onChange({ file, imageUrl: undefined });
		e.target.value = ''; // Reset input để cho phép chọn lại cùng 1 file
	};

	const handleRemove = (): void => {
		onChange(undefined);
	};

	return (
		<div className='w-full'>
			<Input
				id={FILE_INPUT_ID}
				type='file'
				accept='image/*'
				className='hidden'
				onChange={handleAdd}
				disabled={disabled}
			/>

			{!previewUrl ? (
				// Trạng thái chưa có ảnh: Khung chọn ảnh to, dễ bấm
				<Label
					htmlFor={!disabled ? FILE_INPUT_ID : undefined}
					className={`flex flex-col items-center justify-center w-full min-h-[200px] border-2 border-dashed rounded-xl bg-gray-50 transition-colors ${
						disabled
							? 'opacity-50 cursor-not-allowed'
							: 'hover:bg-gray-100 cursor-pointer border-blue-300'
					}`}
				>
					<ImagePlus className='w-10 h-10 text-gray-400 mb-2' />
					<span className='text-sm font-medium text-gray-600'>Nhấn để chọn hình ảnh</span>
				</Label>
			) : (
				// Trạng thái đã có ảnh: Hiển thị Preview và Nút xóa
				<div className='relative w-full min-h-[200px] border rounded-xl overflow-hidden bg-gray-100 group shadow-sm flex items-center justify-center'>
					{/* Dùng thẻ img thường thay vì next/image để tránh lỗi tối ưu Blob URL */}
					<img
						src={previewUrl}
						alt='Preview'
						className='max-w-full max-h-[300px] object-contain'
					/>

					{!disabled && (
						<div className='absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity'>
							<Button
								type='button'
								variant='destructive'
								size='icon'
								onClick={handleRemove}
								className='shadow-lg'
							>
								<Trash2 className='w-4 h-4' />
							</Button>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
