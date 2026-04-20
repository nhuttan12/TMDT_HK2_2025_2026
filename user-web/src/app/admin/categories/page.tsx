import { JSX } from 'react';
import { CategoryListItemAdmin } from '@/types/categories/admin/CategoryListItemAdmin';
import { Metadata } from 'next';
import { getAdminCategories } from '@/services/categories/admin/category-admin-service';
import CategoryAdminContainer from '@/app/admin/categories/_components/category-admin-container';

export const metadata: Metadata = {
	title: 'Quản lý danh mục',
};

export default async function CategoriesPage(): Promise<JSX.Element> {
	const initialCategories: CategoryListItemAdmin[] = await getAdminCategories();

	return (
		<div className='p-6'>
			<CategoryAdminContainer initialCategories={initialCategories} />
		</div>
	);
}
