'use client';

import { useRef, useState, ChangeEvent } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export function AvatarUpload() {
	const [preview, setPreview] = useState<string | null>(null);
	const [isSmallImage, setIsSmallImage] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleOpenFile = () => {
		fileInputRef.current?.click();
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const allowedTypes = ['image/png', 'image/jpeg'];
		const allowedExtensions = ['png', 'jpg', 'jpeg'];

		const fileExtension = file.name.split('.').pop()?.toLowerCase();

		if (
			!allowedTypes.includes(file.type) ||
			!fileExtension ||
			!allowedExtensions.includes(fileExtension)
		) {
			alert('Chỉ chấp nhận file PNG, JPG hoặc JPEG');
			e.target.value = '';
			return;
		}

		const maxSize = 10 * 1024 * 1024;

		if (file.size > maxSize) {
			alert('Kích thước file tối đa là 10MB');
			e.target.value = '';
			return;
		}

		const imageUrl = URL.createObjectURL(file);
		setPreview(imageUrl);
	};

	const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
		const img = e.currentTarget;

		if (img.naturalWidth < 80 || img.naturalHeight < 80) {
			setIsSmallImage(true);
		} else {
			setIsSmallImage(false);
		}
	};

	return (
		<div className='flex items-center gap-6'>
			<Avatar className='h-20 w-20'>
				<AvatarImage
					src={preview || ''}
					onLoad={handleImageLoad}
					className={isSmallImage ? 'object-cover' : 'object-contain'}
				/>
				<AvatarFallback>NT</AvatarFallback>
			</Avatar>

			<Button
				variant='outline'
				onClick={handleOpenFile}
			>
				Đổi ảnh đại diện
			</Button>

			<input
				type='file'
				accept='image/*'
				ref={fileInputRef}
				onChange={handleChange}
				className='hidden'
			/>
		</div>
	);
}
