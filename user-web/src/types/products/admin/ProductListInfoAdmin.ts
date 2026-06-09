import { BaseProduct } from '@/types/products/admin/ProductBaseDTO';

export interface ProductListInfoAdmin extends BaseProduct {
	id: string;
	image: string;
	createdAt: string;
	updatedAt: string;
}
