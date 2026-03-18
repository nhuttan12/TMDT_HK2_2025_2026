import { BaseCategory } from '@/types/categories/admin/BaseCategory';

export type CategoryUpdateDTO = Partial<BaseCategory> & {
	id: number;
	image?: string;
};
