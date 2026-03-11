import { BaseProduct } from '@/types/products/admin/ProductBaseDTO';
import { SortableImageForm } from '@/types/images/admin/SortableImageForm';

export interface ProductDetailInfoAdmin extends BaseProduct {
	productID: number;
	images: SortableImageForm[];
	brand: string;
	description: string;
	discount?: number;
	categoryID: number;
	createdAt: string;
	updatedAt: string;
}
