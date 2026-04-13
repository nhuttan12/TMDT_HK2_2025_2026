import { BaseProduct } from './ProductBaseDTO';
import { SortableImageForm } from '@/types/images/admin/SortableImageForm';

export interface ProductFormState extends BaseProduct {
	id: number;
	images: SortableImageForm[];
	description: string;
	importPrice: number;
	discount?: number;
	categoryId: number;
	createdAt: string;
	updatedAt: string;
}
