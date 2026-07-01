import { BaseProduct } from '@/types/products/admin/ProductBaseDTO';
import { SortableImageForm } from '@/types/images/admin/SortableImageForm';
import { ProductVariantAdmin } from '@/types/products/admin/variant/ProductVariantAdmin';

export interface ProductDetailInfoAdmin extends BaseProduct {
	id: string;
	images: SortableImageForm[];
	supplierName: string;
	description: string;
	importPrice: number;
	discount?: number;
	category: string;
	createdAt: string;
	updatedAt: string;

	productVariants: ProductVariantAdmin[];
}
