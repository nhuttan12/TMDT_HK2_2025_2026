import { JSX } from 'react';
import CategoryAdminForm from '@/app/admin/categories/_components/category-admin-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Thêm mới danh mục',
};

export default function AddNewProductPage(): JSX.Element {
	return <CategoryAdminForm formType='create' />;
}
