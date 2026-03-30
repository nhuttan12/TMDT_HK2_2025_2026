import { BaseProduct } from './ProductBaseDTO';
import { SortableImageForm } from '@/types/images/admin/SortableImageForm';

export interface ProductCreateDTO extends BaseProduct {
	images: SortableImageForm[];
	brand: string;
	description: string;
	discount?: number;
	categoryId: number;
}
