import { BaseCategory } from './BaseCategory';
import { CategoryImage } from '@/types/images/admin/CategoryImage';

export interface CategoryDetailInfoAdmin extends BaseCategory {
	id: number;
	image?: CategoryImage;
	productCount: number;
	createdAt: string;
	updatedAt: string;
}
