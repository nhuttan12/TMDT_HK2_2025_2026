import { ImageFormAdmin } from '@/types/products/admin/ImageFormAdmin';

export interface CreateProductInput {
	name: string;
	brand: string;
	description: string;

	price: number;
	discount?: number;

	categoryID: number;

	images: ImageFormAdmin[];
}
