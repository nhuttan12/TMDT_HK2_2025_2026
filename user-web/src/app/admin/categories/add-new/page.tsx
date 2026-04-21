import { JSX } from 'react';
import { Metadata } from 'next';
import { CategoryDetailInfoAdmin } from '@/types/categories/admin/CategoryDetailInfoAdmin';
import CategoryFormContainer from '@/app/admin/categories/_components/category-form-container';

export const metadata: Metadata = {
	title: 'Thêm mới danh mục',
};

const emptyCategory: CategoryDetailInfoAdmin = {
	id: 0,
	name: '',
	slug: '',
	description: '',
	status: true,
	image: undefined,
	productCount: 0,
	createdAt: '',
	updatedAt: '',
};

export default function CreateCategoryPage(): JSX.Element {
	return (
		<CategoryFormContainer
			initialData={emptyCategory}
			formType='create'
		/>
	);
}
