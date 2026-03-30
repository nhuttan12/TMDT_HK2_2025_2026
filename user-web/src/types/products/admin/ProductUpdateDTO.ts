import { SortableImageForm } from '@/types/images/admin/SortableImageForm';
import { BaseProduct } from '@/types/products/admin/ProductBaseDTO';

export type ProductUpdateDTO = Partial<BaseProduct> & {
	id: number;
	images?: SortableImageForm[];
	brand: string;
	description: string;
	discount?: number;
	categoryId: number;
};
