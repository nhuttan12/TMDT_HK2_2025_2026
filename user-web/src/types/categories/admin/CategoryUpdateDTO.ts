import { BaseCategory } from '@/types/categories/admin/BaseCategory';

export type CategoryUpdateDTO = Partial<BaseCategory> & {
	categoryID: number;
	image?: string;
};
