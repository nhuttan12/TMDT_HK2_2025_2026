'use client';

import { useRef, useState, ChangeEvent, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

// 1. Định nghĩa Interface cho Props nhận vào
interface AvatarUploadProps {
	imageUrl?: string | null;
	onChangeImage?: (file: File) => void; // Option thêm: callback gửi file lên component cha khi user đổi ảnh
}

export function AvatarUpload({ imageUrl, onChangeImage }: AvatarUploadProps) {
	// 2. Sử dụng imageUrl làm giá trị khởi tạo cho preview
	const [preview, setPreview] = useState<string | null>(imageUrl || null);
	const [isSmallImage, setIsSmallImage] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	// 3. Đồng bộ lại preview nếu imageUrl từ cha thay đổi (ví dụ khi API vừa load xong)
	useEffect(() => {
		if (imageUrl) {
			setPreview(imageUrl);
		}
	}, [imageUrl]);

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

		// Tạo URL preview tạm thời từ file local vừa chọn
		const localImageUrl = URL.createObjectURL(file);
		setPreview(localImageUrl);

		// Kích hoạt callback báo cho component cha biết nếu có truyền vào
		if (onChangeImage) {
			onChangeImage(file);
		}
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
				type='button' // Đảm bảo không bị trigger submit nhầm nếu nằm trong thẻ <form>
				onClick={handleOpenFile}
			>
				Đổi ảnh đại diện
			</Button>

			<input
				type='file'
				accept='image/png, image/jpeg, image/jpg' // Giới hạn trực tiếp tại hội thoại chọn file
				ref={fileInputRef}
				onChange={handleChange}
				className='hidden'
			/>
		</div>
	);
}
