import { CategoryDetailInfoAdmin } from '@/types/categories/admin/CategoryDetailInfoAdmin';
import { CategoryCreateDTO } from '@/types/categories/admin/CategoryCreateDTO';
import { CategoryUpdateDTO } from '@/types/categories/admin/CategoryUpdateDTO';
import { CategoryResponse } from '@/types/categories/admin/CategoryResponse';

export const mapCategoryFormToCreateDTO = (form: CategoryDetailInfoAdmin): CategoryCreateDTO => ({
	name: form.name,
	slug: form.slug,
	description: form.description,
	status: form.status,
	image: form.image!.imageUrl!,
});

export const mapCategoryFormToUpdateDTO = (form: CategoryDetailInfoAdmin): CategoryUpdateDTO => ({
	categoryID: form.categoryID,
	name: form.name,
	slug: form.slug,
	description: form.description,
	status: form.status,
	image: form.image?.imageUrl,
});

export const mapCategoryResponseToAdmin = (data: CategoryResponse): CategoryDetailInfoAdmin => {
	return {
		categoryID: data.categoryID,
		name: data.name,
		slug: data.slug,
		description: data.description,
		status: data.status,
		productCount: data.productCount,
		createdAt: data.createdAt,
		updatedAt: data.updatedAt,

		image: {
			imageUrl: data.imageUrl!,
		},
	};
};
