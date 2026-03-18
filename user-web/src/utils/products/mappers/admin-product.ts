import { ProductFormState } from '@/types/products/admin/ProductFormState';
import { ProductCreateDTO } from '@/types/products/admin/ProductCreateDTO';
import { ProductUpdateDTO } from '@/types/products/admin/ProductUpdateDTO';
import { ProductDetailInfoAdmin } from '@/types/products/admin/ProductDetailInfoAdmin';

export const mapProductAdminToFormState = (product: ProductDetailInfoAdmin): ProductFormState => ({
	id: product.id,
	name: product.name,
	slug: product.slug,
	brand: product.brand,
	description: product.description,
	price: product.price,
	discount: product.discount,
	status: product.status,
	categoryID: product.categoryID,
	createdAt: product.createdAt,
	updatedAt: product.updatedAt,
	images: product.images,
});

export const mapFormToCreateDTO = (form: ProductFormState): ProductCreateDTO => ({
	name: form.name,
	slug: form.slug,
	brand: form.brand,
	description: form.description,
	price: form.price,
	discount: form.discount,
	status: form.status,
	categoryID: form.categoryID,
	images: form.images,
});

export const mapFormToUpdateDTO = (form: ProductFormState): ProductUpdateDTO => ({
	id: form.id,
	name: form.name,
	slug: form.slug,
	brand: form.brand,
	description: form.description,
	price: form.price,
	discount: form.discount,
	status: form.status,
	categoryID: form.categoryID,
	images: form.images,
});
