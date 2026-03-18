import { BaseCategory } from '@/types/categories/admin/BaseCategory';

export interface CategoryResponse extends BaseCategory {
	id: number;
	imageUrl?: string;
	productCount: number;
	createdAt: string;
	updatedAt: string;
}
