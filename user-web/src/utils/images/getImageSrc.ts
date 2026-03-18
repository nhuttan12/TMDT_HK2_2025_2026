import { BaseImage } from '@/types/images/admin/BaseImage';

export function getImageSrc(img?: BaseImage): string | null {
	if (!img) return null;

	if (img.file) return URL.createObjectURL(img.file);

	return img.imageUrl || null;
}
