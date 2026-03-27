import { JSX } from 'react';
import CategoryAdminForm from '@/app/admin/categories/_components/category-admin-form';

export default function AddNewProductPage(): JSX.Element {
	return <CategoryAdminForm formType='create' />;
}
