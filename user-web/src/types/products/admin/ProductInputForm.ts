import { ImageFormAdmin } from '@/types/products/admin/ImageFormAdmin';

export interface ProductInputForm {
	name: string;
	brand: string;
	description: string;

	price: number;
	discount?: number;
	isActive: boolean;

	categoryID: number;

	images: ImageFormAdmin[];
}
