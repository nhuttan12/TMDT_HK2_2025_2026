import { ImageFormAdmin } from '@/types/products/admin/ImageFormAdmin';

export interface CategoryInputForm {
	name: string;
	slug: string;
	description?: string;
	isActive: boolean;
	image: ImageFormAdmin | undefined;
}