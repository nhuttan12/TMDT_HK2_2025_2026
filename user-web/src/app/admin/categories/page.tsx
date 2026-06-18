import CategoryAdminContainer from '@/app/admin/categories/_components/category-admin-container';
import { getAdminCategories } from '@/services/categories/admin/category-admin-service';
import { Metadata } from 'next';
import { JSX } from 'react';

export const metadata: Metadata = {
	title: 'Quản lý danh mục',
};

export default async function CategoriesPage(): Promise<JSX.Element> {
	const initialCategories = await getAdminCategories({ page: 1, limit: 10 });

	return (
		<div className='p-6'>
			<CategoryAdminContainer initialCategories={initialCategories} />
		</div>
	);
}
