'use client';

import { SortableImageForm } from '@/types/images/admin/SortableImageForm';
import { JSX, useEffect, useMemo } from 'react';
import Image from 'next/image';

interface Props {
	img: SortableImageForm;
	width: number;
	height: number;
}

export default function ImagePreview({ img, width, height }: Props): JSX.Element {
	const src = useMemo(() => {
		if (!img.file) return img.imageUrl || null;

		return URL.createObjectURL(img.file);
	}, [img.file, img.imageUrl]);

	useEffect(() => {
		if (!img.file || !src) return;

		return () => {
			URL.revokeObjectURL(src);
		};
	}, [img.file, src]);

	return src ? (
		<Image
			alt=''
			src={src}
			width={width}
			height={height}
			unoptimized
			className='w-24 h-24 object-cover'
		/>
	) : (
		<div>No image</div>
	);
}
