import { BaseProduct } from '@/types/products/admin/ProductBaseDTO';

export interface ProductListInfoAdmin extends BaseProduct {
	id: number;
	image: string;
	createdAt: string;
	updatedAt: string;
}
