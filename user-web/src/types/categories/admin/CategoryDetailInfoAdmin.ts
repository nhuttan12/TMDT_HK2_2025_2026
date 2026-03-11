import { BaseCategory } from './BaseCategory';

export interface CategoryDetailInfoAdmin extends BaseCategory {
	categoryID: number;
	image: string;
	productCount: number;
	createdAt: string;
	updatedAt: string;
}