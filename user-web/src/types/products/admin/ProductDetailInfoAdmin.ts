import { BaseProduct } from '@/types/products/admin/ProductBaseDTO';
import { SortableImageForm } from '@/types/images/admin/SortableImageForm';

export interface ProductDetailInfoAdmin extends BaseProduct {
	id: number;
	images: SortableImageForm[];
	supplierName: string;
	description: string;
	importPrice: number;
	discount?: number;
	categoryId: number;
	createdAt: string;
	updatedAt: string;
}
