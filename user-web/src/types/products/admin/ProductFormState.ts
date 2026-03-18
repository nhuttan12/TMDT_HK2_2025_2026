import { BaseProduct } from './ProductBaseDTO';
import { SortableImageForm } from '@/types/images/admin/SortableImageForm';

export interface ProductFormState extends BaseProduct {
	id: number;
	images: SortableImageForm[];
	brand: string;
	description: string;
	discount?: number;
	categoryID: number;
	createdAt: string;
	updatedAt: string;
}
