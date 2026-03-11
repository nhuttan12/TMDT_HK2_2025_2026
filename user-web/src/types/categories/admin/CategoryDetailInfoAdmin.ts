import { BaseCategory } from './BaseCategory';
import { CategoryImage } from '@/types/images/admin/CategoryImage';

export interface CategoryDetailInfoAdmin extends BaseCategory {
	categoryID: number;
	image?: CategoryImage;
	productCount: number;
	createdAt: string;
	updatedAt: string;
}